import { Task } from "../entity/Task";
import { getRepository } from "typeorm";
import { SuccessCodes, ErrorCode } from "../procedural-codes";
import { SuccessCodeInterface, ErrorInterface } from "../abstractions";

export async function deleteTask(id: string) {
  const taskRepository = getRepository(Task);
  let _genericSuccess: SuccessCodeInterface;
  const taskToRemove = await taskRepository.findOne(id);

  if (taskToRemove) {
    await taskRepository.remove(taskToRemove);
    _genericSuccess = { ...SuccessCodes.GENERIC };
    _genericSuccess.message = `Task with id of ${id} has been removed.`
  } else {
    const _400Error: ErrorInterface = { ...ErrorCode.INVALID_PARAMETERS };
    _400Error.error = 'No task was found by that id';

    throw _400Error;
  }

  return _genericSuccess;
}
