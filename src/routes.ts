import { TaskController } from "./controller/TaskController";

export const Routes = [
  {
    method: "get",
    route: "/tasks",
    controller: TaskController,
    action: "all"
  },
  {
    method: "get",
    route: "/tasks/status/:status",
    controller: TaskController,
    action: "status"
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
