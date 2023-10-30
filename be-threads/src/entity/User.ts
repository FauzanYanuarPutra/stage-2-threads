import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Threads } from "./Thread";
import { Replies } from "./Replies";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string

  @Column({ nullable: true })
  full_name: string

  @Column()
  email: string
  
  @Column({ select: false })
  password: string

  @Column({ nullable: true })
  profile_picture: string

  @Column({ nullable: true })
  profile_description: string

  @OneToMany(() => Threads, threads => threads.user, {
    nullable: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  threads: Threads[]

  @ManyToMany(() => User, user => user.following, {
    nullable: true
  })
  @JoinTable({
    name: "follow",
    joinColumn: {
      name: "following_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "followed_id",
      referencedColumnName: "id"
    }
  })
  followers: User[];


  @ManyToMany(() => User, user => user.followers, {
    nullable: true
  })
  following: User[];

  @ManyToMany(() => Threads, thread => thread.like, {
    nullable: true
  })
  @JoinTable({
    name: 'like'
  })
  your_like: Threads[];

  @OneToMany(() => Replies, replies => replies.thread)
  replies: Replies[]
}


