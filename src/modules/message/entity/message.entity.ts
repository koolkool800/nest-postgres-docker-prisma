import { Room } from 'src/modules/rooms/entity/room.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @ManyToOne(() => User)
  sender: User;
}
