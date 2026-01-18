import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("todos")
export class Todo {
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty()
  @Column()
  title: string;

  @Column()
  desscription: string;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: "ID của danh mục liên quan" })
  categoryId: string;
}
