import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async update({ userId, input }): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, input, { new: true })
      .exec();
  }

  async create({ name }): Promise<User> {
    return this.userModel.create({ name });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(query): Promise<User | undefined> {
    return this.userModel.findOne(query).exec();
  }
}
