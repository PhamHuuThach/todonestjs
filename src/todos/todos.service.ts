import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { Category } from "./../categories/entities/category.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { ObjectId } from "mongodb";
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: MongoRepository<Todo>,
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { categoryName, ...todoData } = createTodoDto;
    if (categoryName) {
      const category = await this.categoryRepository.findOneBy({
        name: categoryName,
      });
      if (!category) {
        throw new NotFoundException(
          `Category with name ${categoryName} not found`,
        );
      }

      const categoryId = category._id.toString();
      const newTodo = this.todoRepository.create({
        ...todoData,
        categoryId: categoryId,
      });
      return await this.todoRepository.save(newTodo);
    }
  }
  async findAllWithCategory() {
    const todos = await this.todoRepository.find();

    // Xử lý map để lấy thêm thông tin category cho mỗi todo
    return Promise.all(
      todos.map(async (todo) => {
        if (todo.categoryId) {
          const category = await this.categoryRepository.findOneBy({
            _id: new ObjectId(todo.categoryId),
          } as any);
          return { ...todo, category };
        }
        return todo;
      }),
    );
  }
  async findOne(id: string): Promise<Todo> {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    const todo = await this.todoRepository.findOneBy({
      _id: new ObjectId(id),
    } as any);
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
    return await this.todoRepository.save(todo); // Lưu lại vào MongoDB
  }
  async remove(id: string): Promise<void> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }

  async searchByTitle(title: string): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: { title: { $regex: title, $options: "i" } },
    });
  }
}
