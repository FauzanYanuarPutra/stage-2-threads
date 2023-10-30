import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Replies } from "./Replies";

@Entity('threads')
export class Threads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string

  @Column({ nullable: true })
  image: string

  @ManyToOne(() => User, User => User.threads,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  user: User

  @OneToMany(() => Replies, replies => replies.thread)
  replies: Replies[]
  

  @ManyToMany(() => User, user => user.your_like)
  like: User[];
  
}


