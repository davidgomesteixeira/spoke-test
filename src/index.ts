import "reflect-metadata";
import { DataBase } from "./db";
import { ExpressServer } from "./server";

const newExpressServer = new ExpressServer();
const newDataBaseConnection = new DataBase();
newDataBaseConnection.dataBaseConnection(newExpressServer.initServer).then(() => console.log('Database connected'));
