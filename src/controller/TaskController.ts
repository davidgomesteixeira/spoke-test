import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Task } from "../entity/Task";
import { Queries, getTasks, getSingleTask, deleteTask } from "../helpers";
import { ErrorInterface } from "../abstractions";
import { SuccessCodes } from "../procedural-codes";

export class TaskController {
  private taskRepository = getRepository(Task);
  
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await getTasks(request.query);
      response.send(result);
    } catch (error) {
      response.send(error);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await getSingleTask(request.params.id);
      response.send(result);
    } catch (error) {
      response.send(error);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await this.taskRepository.save(request.body);
      response.send(result);
    } catch(error) {
      response.send(error);
    } 
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      await Queries.update(request.body)
      response.jsonp(SuccessCodes.GENERIC);
    } catch(error) {
      let _genericError: ErrorInterface;

      if (error.message) {
        _genericError.error = error.message;
      }

      response.jsonp(_genericError);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await deleteTask(request.params.id);
      response.jsonp(result);
    } catch (error) {
      response.jsonp(error);
    }
  }

}