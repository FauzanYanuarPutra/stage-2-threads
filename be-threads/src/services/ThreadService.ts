import { PrimaryColumnCannotBeNullableError, Repository } from "typeorm"
import { Threads } from "../entity/Thread"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import UserService from "./UserService"

export default new class ThreadService {
  private readonly ThreadsRepository: Repository<Threads> = AppDataSource.getRepository(Threads)

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const threads = await this.ThreadsRepository.find({
        relations: ['user', 'replies', 'replies.user', 'like'],
        order: {
          id: 'DESC'
        }
      })
      return res.status(200).json(threads)
    } catch (error) {
      console.log(error)
    }
  }


  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const thread = await this.ThreadsRepository.findOne({
        where: {
          id: Number(req.params.id)
        },
        relations: ['user', 'replies', 'replies.user', 'like']
      })
      return res.status(200).json(thread)
    } catch (error) {
      console.log(error)
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { content, userID } = req.body
      const image = req.file.path

      const user = await UserService.finById(userID)
      const thread = this.ThreadsRepository.create({ content, image, user })
      await this.ThreadsRepository.save(thread)
      return res.status(200).json(thread)
    } catch (error) {
      console.log(error)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { content, image } = req.body
      const thread = await this.ThreadsRepository.findOneBy({ id: Number(req.params.id) })
      thread.content = content
      thread.image = image
      await this.ThreadsRepository.save(thread)
      return res.status(200).json('Thread updated')
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const thread = await this.ThreadsRepository.findOneBy({ id: Number(req.params.id) })
      await this.ThreadsRepository.remove(thread)
      return res.status(200).json(thread)
    } catch (error) {
      console.log(error)
    }
  }

}