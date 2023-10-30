import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Threads } from "./Thread";

@Entity('replies')
export class Replies {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  content: string

  @Column({ nullable: true })
  image: string

  @ManyToOne(() => User, user => user.replies ,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  user: User

  @ManyToOne(() => Threads, thread => thread.replies ,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  thread: Threads
}

