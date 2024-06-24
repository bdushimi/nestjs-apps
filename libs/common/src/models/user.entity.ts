import { AbstractEntity } from '@app/common';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class UserEntity extends AbstractEntity<UserEntity> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles?: Role[];
}
