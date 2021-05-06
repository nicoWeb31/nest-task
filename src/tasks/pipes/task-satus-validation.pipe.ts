import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

@Injectable()
export class TaskSatusValidationPipe implements PipeTransform {

  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
  ]

  transform(value: any) {
    console.log(value)
    value = value.toUpperCase();

    if(!this.isStatusValid(value)) {
      throw new BadRequestException(`format of status : ${value} is not valid`);
    }

    return value;
  }


  private isStatusValid(status:any): boolean {
    const index = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
