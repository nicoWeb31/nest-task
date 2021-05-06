import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    createTask(task: CreateTaskDto): Task {
        const newTask: Task = {
            id: uuid.v1(),
            ...task,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(newTask);
        return newTask;
    }

    one(id: string): Task {
        const task = this.tasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException('task not found');
        }
        return task;
    }

    delete(id: string): void {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            throw new NotFoundException('task not found');
        }

        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    update(id: string, updateTasksDto: TaskStatus) {
        const task = this.one(id);
        task.status = updateTasksDto;

        return task;
    }
}
