import { Request, Response } from "express"
import RepliesService from "../services/RepliesService"

export default new class ThreadController {
  async find(req: Request, res: Response) {
    return await RepliesService.find(req, res)
  }

  async findOne(req: Request, res: Response) {
    return await RepliesService.findOne(req, res)
  }

  async create(req: Request, res: Response) {
    return await RepliesService.create(req, res)
  }

  async update(req: Request, res: Response) {
    return await RepliesService.update(req, res)
  }

  async delete(req: Request, res: Response) {
    return await RepliesService.delete(req, res)
  }
}