import { Delete, Patch } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
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

    @Get(':id')
    oneById(@Param('id') id : string) : Task {
        return this.taskservice.one(id)
    }

    @Delete(':id')
    remove(@Param('id') id : string){
        return this.taskservice.delete(id)
    }

    @Patch(':id/status')
    update(@Param('id') id : string, @Body() updateTask : TaskStatus) : Task{
        return this.taskservice.update(id, updateTask)
    }

}
