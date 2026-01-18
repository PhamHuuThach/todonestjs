import { IsString, IsNotEmpty, IsHexColor } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Học tập",
    description: "Tên danh mục",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "#3498db", description: "Mã màu hiển thị" })
  @IsHexColor({ message: "Màu sắc phải là mã Hex hợp lệ" })
  color: string;
}
