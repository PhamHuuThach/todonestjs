// src/modules/categories/categories.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { Category, CategorySchema } from "./schema/category.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  exports: [
    MongooseModule, // 👈 bắt buộc export
    CategoriesService,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
