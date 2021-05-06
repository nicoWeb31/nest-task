import { TaskStatus } from "../tasks.model";

export class GetTaskStatusDto {
    status : TaskStatus;
    search : string;
}