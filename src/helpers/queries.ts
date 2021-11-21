import {getConnection} from "typeorm";
import { Task } from "../entity/Task";

class Queries {
  public static async update(id: number, taskUpdate: string) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Task)
        .set({ task: taskUpdate, })
        .where("id = :id", { id: id })
        .execute();
    } catch (error) {
      return error;
    }
  }
}

export { Queries };
