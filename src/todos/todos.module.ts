import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { Todo } from "./entities/todo.entity";
import { Category } from "./../categories/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Category])], // Quan trọng: Đăng ký Entity ở đây
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
