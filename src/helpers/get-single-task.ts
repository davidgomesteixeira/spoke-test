import { getRepository } from "typeorm";
import { Task } from "../entity/Task";

export async function getSingleTask(id: string)  {
  const taskRepository = getRepository(Task);

  try {
    const result = await taskRepository.findOne(id)
    return result;
  } catch (error) {
    return error;
  }
}
