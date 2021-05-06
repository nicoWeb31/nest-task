import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    createTask(task : CreateTaskDto):Task {
        const newTask: Task = {
            id: uuid.v4(),
            ...task,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(newTask);
        return newTask;
    }
}
