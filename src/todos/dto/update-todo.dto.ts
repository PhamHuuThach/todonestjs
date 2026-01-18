import { PartialType } from "@nestjs/swagger";
import { CreateTodoDto } from "./create-todo.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: "Trạng thái hoàn thành của công việc",
    example: true,
    required: true,
  })
  @IsBoolean({ message: "Trạng thái phải là kiểu true/false" })
  @IsOptional()
  isCompleted?: boolean;
}
