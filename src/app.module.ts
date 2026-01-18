import { Module } from "@nestjs/common";
import { TodosModule } from "./todos/todos.module";
import { CategoriesModule } from "./categories/categories.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todos/entities/todo.entity";
import { Category } from "./categories/entities/category.entity";
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
      useNewUrlParser: true,
      useUnifiedTopology: true,

      // 2 tuỳ chọn TLS/SSL để kết nối Atlas
      ssl: true,
      sslValidate: false, // ⚠️ chỉ dùng khi SSL verify gây lỗi

      entities: [Todo, Category],
      synchronize: true,
    }),

    TodosModule,
    CategoriesModule,
  ],
})
export class AppModule {}
