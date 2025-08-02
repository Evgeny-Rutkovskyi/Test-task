import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { TaskService } from './task.service';
import { ZodValidationPipe } from '../pipes/zodValidationPipe';
import { createTaskSchema, CreateTaskZodDto } from './dto/createTaskZod.dto';
import { updateTaskSchema, UpdateTaskZodDto } from './dto/updateTaskZod.dto';
import { StatusTask } from './enum/statusTask.enum';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async getAllTask() {
        return await this.taskService.getAllTask();
    }

    @Get('/by')
    async getTaskByStatus(@Query('status') status: StatusTask) {
        return await this.taskService.getTaskByStatus(status);
    }

    @Get('/filter')
    async getFilterTask(@Query('search') search: string) {
        return await this.taskService.getFilterTask(search);
    }
    
    @Post('/create')
    @UsePipes(new ZodValidationPipe(createTaskSchema))
    async createTask(@Body() option: CreateTaskZodDto) {
        return await this.taskService.createTask(option);
    }

    @Patch('/update')
    @UsePipes(new ZodValidationPipe(updateTaskSchema))
    async updateTask(@Body() option: UpdateTaskZodDto) {
        return await this.taskService.updateTask(option);
    }

    @Delete('/delete/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        return await this.taskService.deleteTask(id);
    }
}
