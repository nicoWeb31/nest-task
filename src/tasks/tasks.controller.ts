import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskStatusDto } from './dto/getTaskFilter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskservice: TasksService) {}

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskservice.createTask(createTaskDto);
    }

    @Get(':id')
    oneById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskservice.getTaskById(id);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskservice.delete(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() taskStatus: TaskStatus,
    ): Promise<Task> {
        return this.taskservice.update(id, taskStatus);
    }

    @Get()
    getTask(@Query(ValidationPipe) filterdto: GetTaskStatusDto) {
        return this.taskservice.getTask(filterdto);
    }


    // @Get()
    // getAllTask(@Query(ValidationPipe) getTaskDto: GetTaskStatusDto): Task[] {
    //     console.log(getTaskDto);
    //     if (Object.keys(getTaskDto).length) {
    //         return this.taskservice.getFilterTask(getTaskDto);
    //     }
    //     return this.taskservice.getAll();
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
