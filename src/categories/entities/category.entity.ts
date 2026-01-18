import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("categories")
export class Category {
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty({ example: "Học tập" })
  @Column()
  name: string;

  @ApiProperty({ example: "#ff0000" })
  @Column()
  color: string; // Mã màu để hiển thị giao diện
}
