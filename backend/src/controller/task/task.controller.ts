import { Controller } from '@nestjs/common';
import { TaskService } from 'src/service/task.service';
import { Body, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { create } from 'domain';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
 @Post()
    async createTask(@Res() response, @Body() createTaskDto: CreateTaskDto) {
   try {
     const newTask = await this.taskService.createTask(createTaskDto);
     return response.status(HttpStatus.CREATED).json({
     title: newTask.title,
     description: newTask.description,
     due: newTask.due,
     priority: newTask.priority,
     status: newTask.status,
     _id: newTask._id});
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message: 'Error: Task not created!',
     error: 'Bad Request'
  });
  }
 }

 @Get(':tableName')
    async getCurrentBoardTasks(@Res() response, @Param('tableName') tableName) {
    try {
        const tasks = await this.taskService.getCurrentBoardTasks(tableName);
        return response.status(HttpStatus.OK).json(tasks);
    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Tasks not found!',
        error: 'Bad Request'
        });
    }
    }


    @Delete(':taskID')
    async deleteTask(@Res() response, @Param('taskID') taskID) {
        try {
            console.log(taskID);
            const task = await this.taskService.deleteTask(taskID);
            console.log(task);
            if (!task) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    statusCode: 404,
                    message: 'Task not found!',
                    error: 'Not Found'
                });
            }
            return response.status(HttpStatus.OK).json({
                message: 'Task has been deleted!',
                statusCode: 200
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Task not deleted!',
                error: err.message
            });
        }
    }

    @Put(':taskID')
    async updateTask(@Res() response, @Param('taskID') taskID, @Body() createTaskDto: CreateTaskDto) {
        try {
            const task = await this.taskService.updateTask(taskID, createTaskDto);
            if (!task) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    statusCode: 404,
                    message: 'Task not found!',
                    error: 'Not Found'
                });
            }
            return response.status(HttpStatus.OK).json({
                message: 'Task has been successfully updated',
                statusCode: 200
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Task not updated!',
                error: 'Bad Request'
            });
        }
    }
}