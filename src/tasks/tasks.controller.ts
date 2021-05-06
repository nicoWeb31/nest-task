import { Body, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskservice: TasksService) {}

    @Get()
    all(): Task[] {
        return this.taskservice.getAll();
    }

    @Post()
    create(@Body() createTaskDto : CreateTaskDto) {
        return this.taskservice.createTask(createTaskDto);
    }
}
