// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { TodosService } from "./todos.service";
// import { TodosController } from "./todos.controller";
// import { Todo } from "./entities/todo.schema";
// import { Category } from "./../categories/entities/category.entity";

// @Module({
//   imports: [TypeOrmModule.forFeature([Todo, Category])], // Quan trọng: Đăng ký Entity ở đây
//   controllers: [TodosController],
//   providers: [TodosService],
// })
// export class TodosModule {}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { Todo, TodoSchema } from "./schema/todo.schema";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    CategoriesModule,
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
