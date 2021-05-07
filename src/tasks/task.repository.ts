import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskStatusDto } from './dto/getTaskFilter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { description, title } = createTaskDto;
        const newTask = new Task();
        newTask.title = title;
        newTask.description = description;
        newTask.status = TaskStatus.OPEN;
        await newTask.save();
        return newTask;
    }

    async getTasks(fitlerDto: GetTaskStatusDto): Promise<Task[]> {
        const { search, status } = fitlerDto;
        //Query Builder

        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(task.title LIKE :search OR task.description LIKE :search)',
                { search: `%${search}%` },
            );
        }
        const task = await query.getMany();
        return task;
    }
}
