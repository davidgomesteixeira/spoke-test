import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Task } from "../entity/Task";
import { Queries } from "../helpers";
import { ErrorInterface, SuccessCodeInterface } from "../abstractions";
import { ErrorCode, SuccessCodes } from "../procedural-codes";

export class TaskController {
  private taskRepository = getRepository(Task);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const queryFilter: {} = request.query;
      const allTasks = await this.taskRepository.find({ order: { id: "ASC" } });
  
      const filteredTasks = allTasks.filter(function(task: {})  {
        let isValid = true;
        for (const key in queryFilter) {
          console.log(key, task[key], queryFilter[key]);
          isValid = isValid && task[key] === queryFilter[key];
        }
        return isValid;
      });
  
      response.send(filteredTasks);
    } catch (error) {
      // error handling should go here (seperate it in a helper I guess?)
      response.send(error);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await this.taskRepository.findOne(request.params.id);
      response.send(result);
    } catch (error) {
      // error handling should go here (seperate it in a helper I guess?)
      response.send(error);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await this.taskRepository.save(request.body);
      response.send(result);
    } catch(error) {
      // error handling should go here (seperate it in a helper I guess?)
      response.send(error);
    } 
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      await Queries.update(request.body)
      response.jsonp(SuccessCodes.GENERIC);
    } catch(error) {
      // error handling should go here (seperate it in a helper I guess?)
      let _genericError: ErrorInterface;

      if (error.message) {
        _genericError.error = error.message;
      }

      response.jsonp(_genericError);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      let _genericSuccess: SuccessCodeInterface;
      const taskToRemove = await this.taskRepository.findOne(request.params.id);

      if (taskToRemove) {
        await this.taskRepository.remove(taskToRemove);
        _genericSuccess = { ...SuccessCodes.GENERIC };
        _genericSuccess.message = `Task with id of ${request.params.id} has been removed.`
      } else {
        const _400Error: ErrorInterface = { ...ErrorCode.INVALID_PARAMETERS };
        _400Error.error = 'No task was found by that id';

        throw _400Error;
      }

      response.jsonp(_genericSuccess);
    } catch (error) {
      // error handling should go here (seperate it in a helper I guess?)
      response.jsonp(error);
    }
  }

}