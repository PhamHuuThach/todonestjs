// import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";
// import { ApiProperty } from "@nestjs/swagger";

// @Entity("categories")
// export class Category {
//   @ObjectIdColumn()
//   _id: ObjectId;

//   @ApiProperty({ example: "Học tập" })
//   @Column()
//   name: string;

//   @ApiProperty({ example: "#ff0000" })
//   @Column()
//   color: string; // Mã màu để hiển thị giao diện
// }
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  color: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
