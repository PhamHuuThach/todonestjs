import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodosModule } from "./todos/todos.module";
import { CategoriesModule } from "./categories/categories.module";
import { Todo } from "./todos/entities/todo.entity";
import { Category } from "./categories/entities/category.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,

      // ✔ dùng TLS đúng driver hiện tại
      tls: true,
      tlsAllowInvalidCertificates: true,

      entities: [Todo, Category],
      synchronize: true,
    }),

    TodosModule,
    CategoriesModule,
  ],
})
export class AppModule {}
