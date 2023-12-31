import { PrimaryColumnCannotBeNullableError, Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import UserService from "./UserService"
import { Replies } from "../entity/Replies"
import cloudinary from "../config/cloudinary"

export default new class ThreadService {
  private readonly RepliesRepository: Repository<Replies> = AppDataSource.getRepository(Replies)

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const threads = await this.RepliesRepository.find({
        relations: ['user', 'thread', 'thread.replies'],
        order: {
          thread: {
            replies: {
              id: 'ASC'
            }
          }
        }
      })
      return res.status(200).json(threads)
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const thread = await this.RepliesRepository.findOne({
        where: {
          id: Number(req.params.id)
        },
        relations: ['user', 'thread', 'thread.replies'],
        
      })
      return res.status(200).json(thread)
    } catch (error) {
      console.log(error)
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { content,  user, thread } = req.body
      cloudinary.upload();
      const imageLink = await cloudinary.destination(req.file.filename);

      const replies = this.RepliesRepository.create({ content, image: imageLink, user, thread })
      await this.RepliesRepository.save(replies)

      const data = await this.RepliesRepository.findOne({
        where: {
          id: replies.id
        },
        relations: ['user', 'thread', 'thread.replies', 'thread.replies.user'],
        order: {
          thread: {
            replies: {
              id: 'ASC'
            }
          }
        }
      })
      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { content, image } = req.body
      const thread = await this.RepliesRepository.findOneBy({ id: Number(req.params.id) })
      thread.content = content
      thread.image = image
      await this.RepliesRepository.save(thread)
      return res.status(200).json('Thread updated')
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const thread = await this.RepliesRepository.findOneBy({ id: Number(req.params.id) })
      await this.RepliesRepository.remove(thread)
      return res.status(200).json(thread)
    } catch (error) {
      console.log(error)
    }
  }

}