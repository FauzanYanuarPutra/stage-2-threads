import { Request, Response } from "express"
import ThreadService from "../services/ThreadService"
import ThreadQueue from "../queue/ThreadQueue"

export default new class ThreadController {
  async find(req: Request, res: Response) {
    return await ThreadService.find(req, res)
  }

  async findOne(req: Request, res: Response) {
    return await ThreadService.findOne(req, res)
  }

  async create(req: Request, res: Response) {
    return await ThreadQueue.create(req, res)
  }

  async update(req: Request, res: Response) {
    return await ThreadService.update(req, res)
  }

  async delete(req: Request, res: Response) {
    return await ThreadService.delete(req, res)
  }

}