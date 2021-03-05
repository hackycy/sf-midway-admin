import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '../../../base';

@EntityModel({ name: 'image_space_info' })
export default class ImageSpaceInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type_id' })
  typeId: number;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column()
  extra: string;
}
