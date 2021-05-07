import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskStatusDto } from './dto/getTaskFilter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: TaskRepository,
    ) {}

    async getAll() {
        return await this.taskRepo.find();
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepo.findOne(id);
        if (!found) {
            throw new NotFoundException(`task with id : ${id} not found`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepo.createTask(createTaskDto);
    }

    async delete(id: number): Promise<void> {
        // const task = await this.taskRepo.findOne(id);
        // this.taskRepo.remove(task);
        const result = await this.taskRepo.delete(id);//return {raw:[],affected : 0}

        if(result.affected === 0){
            throw new NotFoundException(`task with id : ${id} not found`)
        }
    }

    async update (id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save()
        return task;
        
    }

    getTask(getfilter : GetTaskStatusDto): Promise<Task[]> {
        return this.taskRepo.getTasks(getfilter)

    }

    // getAll(): Task[] {
    //     return this.tasks;
    // }

    // createTask(task: CreateTaskDto): Task {
    //     const newTask: Task = {
    //         id: uuid.v1(),
    //         ...task,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(newTask);
    //     return newTask;
    // }

    // one(id: string): Task {
    //     const task = this.tasks.find((task) => task.id === id);

    //     if (!task) {
    //         throw new NotFoundException(`task with id : ${id} not found`);
    //     }
    //     return task;
    // }

    // delete(id: string): void {
    //     const found = this.one(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // }

    // update(id: string, updateTasksDto: TaskStatus) {
    //     const task = this.one(id);
    //     task.status = updateTasksDto;

    //     return task;
    // }

    // getFilterTask(filterStatus: GetTaskStatusDto): Task[] {
    //     const { status, search } = filterStatus;

    //     let tasks = this.getAll();

    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(
    //             (task) =>
    //                 task.title.includes(search) ||
    //                 task.description.includes(search),
    //         );
    //     }

    //     return tasks;
    // }
}
