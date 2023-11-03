import * as amqp from "amqplib"
import "dotenv/config"
import { AppDataSource } from "../data-source"
import ThreadWorker from "./ThreadWorker"

export default new class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {

				const connection = await amqp.connect('amqp://localhost')

        await ThreadWorker.create('thread-queue', connection)
      })
      .catch((err) => console.log(err))
  }
}




