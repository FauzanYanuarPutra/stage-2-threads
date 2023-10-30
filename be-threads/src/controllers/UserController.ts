import { Request, Response } from "express"
import UserService from "../services/UserService"

export default new class UserController {
  async register(req: Request, res: Response) {
    return await UserService.register(req, res)
  }

  async login(req: Request, res: Response) {
    return await UserService.login(req, res)
  }

  async check(req: Request, res: Response) {
    return await UserService.check(req, res)
  }

  async find(req: Request, res: Response) {
    return await UserService.find(req, res)
  }

  async findOne(req: Request, res: Response) {
    return await UserService.findOne(req, res)
  }

  async create(req: Request, res: Response) {
    return await UserService.create(req, res)
  }

  async update(req: Request, res: Response) {
    return await UserService.update(req, res)
  }

  async delete(req: Request, res: Response) {
    return await UserService.delete(req, res)
  }

  async like(req: Request, res: Response) {
    return await UserService.like(req, res)
  }

  async follow(req: Request, res: Response) {
    return await UserService.follow(req, res)
  }
  
}