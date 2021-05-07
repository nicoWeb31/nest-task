import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.status.enum";



@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(createTaskDto : CreateTaskDto) : Promise<Task> {

        const { description, title  } = createTaskDto;
        const newTask = new Task();
        newTask.title = title;
        newTask.description = description;
        newTask.status = TaskStatus.OPEN;
        await newTask.save();
        return newTask;

    }
}