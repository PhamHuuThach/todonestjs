import { Module } from "@nestjs/common";
import { TodosModule } from "./todos/todos.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todos/entities/todo.entity";
import { Category } from "./categories/entities/category.entity";
import { CategoriesModule } from "./categories/categories.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb+srv://phamhuuthach:0326430775Thach@cluster0.jku7kpn.mongodb.net/todosdb",
      entities: [Todo, Category],
      synchronize: true,
    }),
    TodosModule,
    CategoriesModule,
  ],
})
export class AppModule {}
