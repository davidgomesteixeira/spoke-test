import {getConnection} from "typeorm";
import { Task } from "../entity/Task";

class Queries {
  public static async update(taskUpdate: { id: number, task: string, status: string }) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Task)
        .set(taskUpdate)
        .where("id = :id", { id: taskUpdate.id })
        .execute();
    } catch (error) {
      return error;
    }
  }
}

export { Queries };
