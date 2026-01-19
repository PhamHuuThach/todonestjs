import { IsString, IsNotEmpty, MinLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
  @ApiProperty({
    description: "Tiêu đề của công việc",
    example: "Học NestJS cơ bản",
  })
  @IsString({ message: "Tiêu đề phải là chuỗi ký tự" })
  @IsNotEmpty({ message: "Tiêu đề không được để trống" })
  @MinLength(3, { message: "Tiêu đề phải có ít nhất 3 ký tự" })
  title: string;

  @ApiProperty({
    description: "Mô tả chi tiết công việc",
    example: "Học về Module, Controller, Service và TypeORM",
    required: false,
  })
  @IsString({ message: "Mô tả phải là chuỗi ký tự" })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: "ID của danh mục (nếu có)",
    example: "65a1b2c3d4e5f67890123456",
    required: false,
  })
  categoryId: string;

  @ApiProperty({
    example: "abc...",
    description: "tên của danh mục",
    required: false,
  })
  @IsOptional()
  categoryName?: string;
}
