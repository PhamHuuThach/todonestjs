// // src/modules/categories/categories.service.ts
// import {
//   Injectable,
//   NotFoundException,
//   BadRequestException,
// } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { MongoRepository } from "typeorm";
// import { Category } from "./schema/category.schema";
// import { CreateCategoryDto } from "./dto/create-category.dto";
// import { UpdateCategoryDto } from "./dto/update-category.dto";
// import { ObjectId } from "mongodb";

// @Injectable()
// export class CategoriesService {
//   constructor(
//     @InjectRepository(Category)
//     private readonly categoryRepo: MongoRepository<Category>,
//   ) {}

//   async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
//     const category = this.categoryRepo.create(createCategoryDto);
//     return await this.categoryRepo.save(category);
//   }

//   async findAll(): Promise<Category[]> {
//     return await this.categoryRepo.find();
//   }

//   async findOne(id: string): Promise<Category> {
//     if (!ObjectId.isValid(id))
//       throw new BadRequestException("Invalid Category ID");
//     const category = await this.categoryRepo.findOneBy({
//       _id: new ObjectId(id),
//     } as any);
//     if (!category) throw new NotFoundException("Category not found");
//     return category;
//   }

//   async update(
//     id: string,
//     updateCategoryDto: UpdateCategoryDto,
//   ): Promise<Category> {
//     const category = await this.findOne(id);
//     Object.assign(category, updateCategoryDto);
//     return await this.categoryRepo.save(category);
//   }

//   async remove(id: string): Promise<void> {
//     const category = await this.findOne(id);
//     await this.categoryRepo.remove(category);
//   }
// }

// src/categories/categories.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "./schema/category.schema";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    const category = new this.categoryModel(createCategoryDto);
    return await category.save();
  }

  async findAll(): Promise<CategoryDocument[]> {
    return await this.categoryModel.find().exec(); // exec() is required to use async/await
  }

  async findOne(id: string): Promise<CategoryDocument> {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    } else {
      return category;
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    return await category.save();
  }
  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryModel.deleteOne({ _id: category._id }).exec();
  }
}
