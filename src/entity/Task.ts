import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity('task')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column({
    default: 'in progress'
  })
  status: string;
}
