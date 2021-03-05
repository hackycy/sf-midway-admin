import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '../../base';

@EntityModel({ name: 'sys_role' })
export default class SysRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ unique: true })
  name: string;

  @Column({ length: 50, unique: true })
  label: string;

  @Column({ nullable: true })
  remark: string;
}
