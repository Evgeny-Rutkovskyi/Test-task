import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskZodDto } from './dto/createTaskZod.dto';
import { UpdateTaskZodDto } from './dto/updateTaskZod.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entity/task.entity';
import { ILike, Repository } from 'typeorm';
import { StatusTask } from './enum/statusTask.enum';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>
    ) { }
    
    async getAllTask(): Promise<{message: string} | {tasks: Task[]}> {
        const tasks = await this.taskRepository.find();
        if (!tasks) return { message: 'You don\'t have any tasks' };
        return { tasks };
    }

    async getTaskByStatus(status: StatusTask): Promise<{message: string} | {tasks: Task[]}> {
        const tasks = await this.taskRepository.find({ where: { status } });
        if (!tasks) return { message: `You don\'t have any tasks with status - ${status}` };
        return { tasks };
    }

    async getFilterTask(search: string): Promise<{message: string} | {tasks: Task[]}> {
        const tasks = await this.taskRepository.find({
            where: [
                { title: ILike(`%${search}%`) },
                { description: ILike(`%${search}%`) }
            ]
        });
        if (!tasks) return { message: 'You don\'t have any tasks by this filters' };
        return { tasks };
    }

    async createTask(option: CreateTaskZodDto): Promise<{newTask: Task}> {
        const newTask = this.taskRepository.create({ ...option });
        await this.taskRepository.save(newTask);
        return { newTask };
    }

    async updateTask(option: UpdateTaskZodDto): Promise<{task: Task}> {
        const task = await this.taskRepository.findOne({ where: { id: option.id } });
        if (!task) throw new BadRequestException('Task was not found');
        const { id, ...updateFields } = option;
        Object.assign(task, updateFields);
        await this.taskRepository.save(task);
        return { task };
    }

    async deleteTask(id: number): Promise<{message: string}> {
        const deletedTask = await this.taskRepository.delete(id);
        if (deletedTask.affected) return { message: 'Task was deleted success' };
        return { message: 'Task was not found' };
    }
}
