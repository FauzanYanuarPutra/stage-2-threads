import * as amqp from "amqplib"
import "dotenv/config"
import { AppDataSource } from "../data-source"
import ThreadWorker from "./ThreadWorker"
import cloudinary from "../config/cloudinary"

export default new class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
				cloudinary.upload()

				const connection = await amqp.connect('amqp://localhost')

        await ThreadWorker.create('thread-queue', connection)
      })
      .catch((err) => console.log(err))
  }
}




