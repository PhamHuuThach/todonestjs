// import {
//   Entity,
//   ObjectIdColumn,
//   ObjectId,
//   Column,
//   CreateDateColumn,
// } from "typeorm";
// import { ApiProperty } from "@nestjs/swagger";

// @Entity("todos")
// export class Todo {
//   @ObjectIdColumn()
//   _id: ObjectId;

//   @ApiProperty()
//   @Column()
//   title: string;

//   @Column()
//   desscription: string;

//   @Column({ default: false })
//   isCompleted: boolean;

//   @CreateDateColumn()
//   createdAt: Date;

//   @Column({ nullable: true })
//   @ApiProperty({ example: "ID của danh mục liên quan" })
//   categoryId: string;
// }

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  desscription: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop()
  categoryId: string;
}
export const TodoSchema = SchemaFactory.createForClass(Todo);
