import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";

@ApiTags("todos")
@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: "Tạo Todo mới" })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get("search")
  @ApiQuery({ name: "title", required: true, description: "Tiêu đề cần tìm" })
  searchByTitle(@Query("title") title: string) {
    return this.todosService.searchByTitle(title);
  }

  @Get()
  findAll() {
    return this.todosService.findAllWithCategory();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Cập nhật thông tin Todo" })
  update(
    @Param("id") id: string,
    @Body() updateTodoDto: UpdateTodoDto, // Đổi từ any sang UpdateTodoDto
  ) {
    return this.todosService.update(id, updateTodoDto);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.todosService.remove(id);
  }
}
