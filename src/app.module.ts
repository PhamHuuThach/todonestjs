import { Module } from "@nestjs/common";
import { TodosModule } from "./todos/todos.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todos/entities/todo.entity";
import { Category } from "./categories/entities/category.entity";
import { CategoriesModule } from "./categories/categories.module";
import * as dotenv from "dotenv";

dotenv.config();

// @ts-ignore
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      entities: [Todo, Category],
      synchronize: true,
    }),
    TodosModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
