import { getRepository } from "typeorm";
import { Task } from "../entity/Task";

export async function getTasks (query: {}) {
  const taskRepository = getRepository(Task);

  try {
    const queryFilter: {} = query;
    const allTasks = await taskRepository.find({ order: { id: "ASC" } });

    const filteredTasks = allTasks.filter(function(task: {})  {
      let isValid = true;
      for (const key in queryFilter) {
        console.log(key, task[key], queryFilter[key]);
        isValid = isValid && task[key] === queryFilter[key];
      }
      return isValid;
    });

    return filteredTasks;
  } catch (error) {
    return error;
  }
}
