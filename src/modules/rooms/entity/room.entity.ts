import { Message } from 'src/modules/message/entity/message.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => User, (user) => user.rooms)
  members: User[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
