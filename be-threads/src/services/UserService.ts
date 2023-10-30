import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { Threads } from "../entity/Thread"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"


export default new class UserService {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
  private readonly ThreadRepository: Repository<Threads> = AppDataSource.getRepository(Threads)


  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { username, full_name, email, password, profile_picture, profile_description } = req.body

      const checkEmail = await this.UserRepository.findOne({
        where: {
          email: req.body.email
        }
      })

      if (checkEmail) return res.status(400).json({ message: "Email already exists" })

      const passwordHash = await bcrypt.hash(password, 10)

      const user = this.UserRepository.create({ username, full_name, email, password: passwordHash, profile_picture, profile_description })



      const data = await this.UserRepository.save(user)

      const users = await this.UserRepository.findOne({
        where: {
          id: data.id
        },
        select: ['id', 'username', 'full_name', 'email', 'profile_picture', 'profile_description', 'password'],
      })

      const payload = await jwt.sign({ id: users.id, username: users.username }, "secret", {
        expiresIn: 60 * 60
      })
      
      return res.status(200).json({ token: payload, data })
    } catch (error) {
      console.log(error)
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {

      const user = await this.UserRepository.findOne({
        where: {
          email: req.body.email
        },
        select: ['id', 'username', 'full_name', 'email', 'profile_picture', 'profile_description', 'password'],
      })
      
      if (!user) return res.status(401).json({ message: "Email or password incorrect" })
      
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword) return res.status(401).json({ message: "Email or password incorrect" })
      
      const payload = await jwt.sign({ id: user.id, user: user.username }, "secret", {
        expiresIn: 60 * 60
      })

      return res.status(200).json({ token: payload, user })
    } catch (error) {
      console.log(error)
    }
  }

  async check(req: Request, res: Response): Promise<Response> {
    try {
      const logginSession = res.locals.logginSession


      const user = await this.UserRepository.findOne({
        where: {
          id: logginSession.id
        }
      })

      return res.status(200).json({
        user,
        message: "You are logged in"
      })
    } catch (err) {
      return res.status(500).json({ Error: "Error while checking" })
    }
  }


  async finById(id: any) {
    try {
      const user = await this.UserRepository.findOneBy({ id: Number(id) })
      console.log(user)
      return user
    } catch (error) {
      console.log(error)
    }
  }
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const User = await this.UserRepository.find({
        relations: ['your_like', 'following', 'followers']
      })
      return res.status(200).json(User)
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.UserRepository.findOne({
        where: {
          id: Number(req.params.id)
        },
        relations: ['your_like', 'following', 'followers']
      })
      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id, username, full_name, email, password, profile_picture, profile_description } = req.body

      const user = this.UserRepository.create({ id, username, full_name, email, password, profile_picture, profile_description })
      await this.UserRepository.save(user)
      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { username, full_name, email, password, profile_picture, profile_description } = req.body
      const user = await this.UserRepository.findOneBy({ id: Number(req.params.id) })
      user.username = username
      user.full_name = full_name
      user.email = email
      user.password = password
      user.profile_picture = profile_picture
      user.profile_description = profile_description
      await this.UserRepository.save(user)
      return res.status(200).json('user updated')
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.UserRepository.findOneBy({ id: Number(req.params.id) })
      await this.UserRepository.remove(user)
      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
    }
  }


  async follow(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.UserRepository.findOne({
        where: {
          id: Number(req.body.id_following),
        },
        relations: ['following', 'followers']
      })

      await this.addOrRemoveFollow(user, req.body.id_followed, req.body.action)

      await this.UserRepository.save(user);

      return res.status(200).json({ data: "berhasil", user })
    } catch (error) {
      console.log(error)
    }
  }

  async like(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.UserRepository.findOneBy({ id: Number(req.params.id) })

      const data = await this.UserRepository.save(user);

      await this.addOrRemoveLike(data.id, req.body.like, req.body.action)

      await this.UserRepository.save(user);

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async findOneById(id: any) {

    const numID = Number(id)
    if (isNaN(numID)) throw new Error('ID must be a number')
    const user = await this.UserRepository.findOne({
      where: {
        id: numID
      },
      relations: ['your_like', 'following', 'followers']
    });
    if (!user) throw new Error('user not found')

    return user
  }

  
  private async addOrRemoveLike(user_id: string | number, partyId: number, action: boolean) {
    const paslon = await this.findOneById(user_id);
  
    if (paslon) {
      if (action === true) {
        const existingParty = paslon.your_like.find((party) => party.id === partyId);
  
        if (!existingParty) {
          const partyToAdd = await this.ThreadRepository.findOne({ where: { id: partyId } });
          paslon.your_like.push(partyToAdd);
          await this.UserRepository.save(paslon);
        }
      } else if (action === false) {
        paslon.your_like = paslon.your_like.filter((party) => party.id !== partyId);
        await this.UserRepository.save(paslon);
      }
  
      return paslon.your_like;
    } else {
      throw new Error('User not found');
    }
  }

  private async addOrRemoveFollow(Data: User, partyId: number, action: boolean) {

    const user = await this.findOneById(partyId)

    if(Data.following.some((following: any) => following.id === partyId)) {
      Data.following = Data.following.filter((party: any) => party.id !== partyId)
    } else {
      Data.following.push(user)
    }

    return await this.UserRepository.save(Data);
  }
}