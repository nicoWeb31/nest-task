import { Delete, Patch } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskStatusDto } from './dto/getTaskFilter.dto';
import { TaskSatusValidationPipe } from './pipes/task-satus-validation.pipe';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskservice: TasksService) {}

    // @Get()
    // getAllTask(@Query(ValidationPipe) getTaskDto: GetTaskStatusDto): Task[] {
    //     console.log(getTaskDto);
    //     if (Object.keys(getTaskDto).length) {
    //         return this.taskservice.getFilterTask(getTaskDto);
    //     }
    //     return this.taskservice.getAll();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // create(@Body() createTaskDto: CreateTaskDto) {
    //     return this.taskservice.createTask(createTaskDto);
    // }

    // @Get(':id')
    // oneById(@Param('id') id: string): Task {
    //     return this.taskservice.one(id);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.taskservice.delete(id);
    // }

    // @Patch(':id/status')
    // update(
    //     @Param('id') id: string,
    //     @Body('status', TaskSatusValidationPipe) updateTask: TaskStatus,
    // ): Task {
    //     return this.taskservice.update(id, updateTask);
    // }
}
