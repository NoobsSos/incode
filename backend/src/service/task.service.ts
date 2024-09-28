import { Injectable } from '@nestjs/common';
import { Task } from '../schemas/task.schema'; 
import { InjectModel } from '@nestjs/mongoose';
import { ITask } from '../interface/task.interface';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private Task) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = await new this.Task(createTaskDto);
    return newTask.save();
 }

  async getCurrentBoardTasks(name): Promise<ITask[]> {
    return this.Task.find({ relatedTable: name });
  }

  async getTask(taskID): Promise<ITask> {
    return this.Task.findById(taskID);
  }

  async deleteTask(taskID): Promise<ITask> {
    return this.Task.findByIdAndRemove(taskID);
  }

  async updateTask(taskID, createTaskDto: CreateTaskDto): Promise<ITask> {
    return this.Task.findByIdAndUpdate(taskID, createTaskDto, { new: true });
  }
}

