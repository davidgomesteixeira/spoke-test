import { TaskController } from "./controller";

export const Routes = [
  {
    method: "get",
    route: "/tasks",
    controller: TaskController,
    action: "all"
  },
  {
    method: "put",
    route: "/tasks/update",
    controller: TaskController,
    action: "update"
  },
  {
    method: "get",
    route: "/tasks/:id",
    controller: TaskController,
    action: "one"
  },
  {
    method: "post",
    route: "/tasks",
    controller: TaskController,
    action: "save"
  },
  {
    method: "delete",
    route: "/tasks/:id",
    controller: TaskController,
    action: "remove"
  }
];
