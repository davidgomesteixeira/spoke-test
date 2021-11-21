import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Task} from "../entity/Task";
import { Queries } from "../helpers";

export class TaskController {

  private taskRepository = getRepository(Task);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.taskRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.taskRepository.findOne(request.params.id);
  }

  async status(request: Request, response: Response, next: NextFunction) {
    const self = this;
    const status = request.params.status;

    const filter = {
      in_progress: () => self.taskRepository.find({ where: { status: 'in progress' }}),
      completed: () => self.taskRepository.find({ where: { status: 'completed' }}),
      all: () => self.taskRepository.find()
    }
    
    return filter[status] && filter[status]() || filter['all']();
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.taskRepository.save(request.body);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    console.log(request.body);
    try {
      await Queries.update(request.body.id, request.body.task)
      response.send('ok');
    } catch(error) {
      response.send('ko');
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let taskToRemove = await this.taskRepository.findOne(request.params.id);
    await this.taskRepository.remove(taskToRemove);
  }

}