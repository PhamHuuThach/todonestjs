// import { Injectable, NotFoundException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { MongoRepository } from "typeorm";
// import { Todo } from "./entities/todo.schema";
// import { Category } from "./../categories/entities/category.entity";
// import { CreateTodoDto } from "./dto/create-todo.dto";
// import { UpdateTodoDto } from "./dto/update-todo.dto";
// import { ObjectId } from "mongodb";
// @Injectable()
// export class TodosService {
//   constructor(
//     @InjectRepository(Todo)
//     private readonly todoRepository: MongoRepository<Todo>,
//     @InjectRepository(Category)
//     private readonly categoryRepository: MongoRepository<Category>,
//   ) {}

//   async create(createTodoDto: CreateTodoDto): Promise<Todo> {
//     const { categoryName, ...todoData } = createTodoDto;
//     if (categoryName) {
//       const category = await this.categoryRepository.findOneBy({
//         name: categoryName,
//       });
//       if (!category) {
//         throw new NotFoundException(
//           `Category with name ${categoryName} not found`,
//         );
//       }

//       const categoryId = category._id.toString();
//       const newTodo = this.todoRepository.create({
//         ...todoData,
//         categoryId: categoryId,
//       });
//       return await this.todoRepository.save(newTodo);
//     }
//   }
//   async findAllWithCategory() {
//     const todos = await this.todoRepository.find();

//     // Xử lý map để lấy thêm thông tin category cho mỗi todo
//     return Promise.all(
//       todos.map(async (todo) => {
//         if (todo.categoryId) {
//           const category = await this.categoryRepository.findOneBy({
//             _id: new ObjectId(todo.categoryId),
//           } as any);
//           return { ...todo, category };
//         }
//         return todo;
//       }),
//     );
//   }
//   async findOne(id: string): Promise<Todo> {
//     if (!ObjectId.isValid(id)) {
//       throw new NotFoundException(`Todo with id ${id} not found`);
//     }
//     const todo = await this.todoRepository.findOneBy({
//       _id: new ObjectId(id),
//     } as any);
//     if (!todo) {
//       throw new NotFoundException(`Todo with id ${id} not found`);
//     } else {
//       return todo;
//     }
//   }

//   async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
//     const todo = await this.findOne(id); // Tìm todo cũ (đã có check id hợp lệ)
//     // Ghi đè các trường có trong updateTodoDto vào todo hiện tại
//     Object.assign(todo, updateTodoDto);
//     return await this.todoRepository.save(todo); // Lưu lại vào MongoDB
//   }
//   async remove(id: string): Promise<void> {
//     const todo = await this.findOne(id);
//     await this.todoRepository.remove(todo);
//   }

//   async searchByTitle(title: string): Promise<Todo[]> {
//     return await this.todoRepository.find({
//       where: { title: { $regex: title, $options: "i" } },
//     });
//   }
// }

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Todo } from "./schema/todo.schema";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Category } from "../categories/schema/category.schema";
import { ObjectId } from "mongodb";

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { categoryName, ...todoData } = createTodoDto;
    let categoryId = todoData.categoryId;

    if (categoryName) {
      const category = await this.categoryModel.findOne({ name: categoryName });
      if (!category) {
        throw new NotFoundException(
          `Category with name ${categoryName} not found`,
        );
      }
      categoryId = category._id.toString();
    }

    const newTodo = new this.todoModel({
      ...todoData,
      categoryId,
    });
    return await newTodo.save();
  }

  async findAllWithCategory(): Promise<any[]> {
    const todos = await this.todoModel.find();
    return Promise.all(
      todos.map(async (todo) => {
        if (todo.categoryId) {
          const category = await this.categoryModel.findById(todo.categoryId);
          return { ...todo.toObject(), category };
        }
        return todo;
      }),
    );
  }

  async findOne(id: string): Promise<Todo> {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    } else {
      return todo;
    }
  }
  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id); // Tìm todo cũ (đã có check id hợp lệ)
    // Ghi đè các trường có trong updateTodoDto vào todo hiện tại
    Object.assign(todo, updateTodoDto);
    return await todo.save(); // Lưu lại vào MongoDB
  }
  async remove(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id);
  }
  async searchByTitle(title: string): Promise<Todo[]> {
    return await this.todoModel.find({
      title: { $regex: title, $options: "i" },
    });
  }
}
