import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  //   @Exclude()
  password: string;

  //   @JoinColumn()
  //   @OneToOne(() => Address)
  //   address:Address
}
