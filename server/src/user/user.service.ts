import { Model, CreateQuery, UpdateQuery, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async updateById({
    userId,
    input,
  }: {
    userId: User['_id'];
    input: UpdateQuery<User>;
  }): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, input, { new: true })
      .exec();
  }

  async create(args: CreateQuery<User>): Promise<User> {
    return this.userModel.create(args);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async findMany(query: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(query).lean();
  }

  async findOne(query: FilterQuery<User>): Promise<User | undefined> {
    return this.userModel.findOne(query).lean();
  }
}
