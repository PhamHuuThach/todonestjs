// import { PartialType } from "@nestjs/swagger";
// import { CreateCategoryDto } from "./create-category.dto";

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
