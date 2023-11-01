import * as amqp from "amqplib"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { EventEmitter } from "stream"
import { Threads } from "../entity/Thread"
import cloudinary from "../config/cloudinary"

export default new class ThreadWorker{
  private readonly ThreadRepository: Repository<Threads> = AppDataSource.getRepository(Threads)
  private emitter = new EventEmitter()

	async create(queueName: string, connection: any) {
    try {
      const channel = await connection.createChannel()
      await channel.assertQueue(queueName)
      await channel.consume(queueName, async (message) => {
        try {
          if(message !== null) {
            const payload = JSON.parse(message.content.toString())
  
						const cloudinaryResponse = payload.image ? await cloudinary.destination(payload.image) : null;


            const thread = this.ThreadRepository.create({
              content: payload.content,
              image: cloudinaryResponse,
              user: payload.user
            })
  
						await this.ThreadRepository.save(thread)
						
            this.emitter.emit("message")
            console.log("(Worker) : Thread is create");
            
            channel.ack(message)
          }
        } catch (err) {
          console.log("(Worker) : Thread is failed", err);
        }
      })
    } catch (err) {
      console.log("(Worker) : Error while consume queue from thread");
    }
  }
}

