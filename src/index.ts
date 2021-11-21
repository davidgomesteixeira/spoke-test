import * as dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import { createConnection, ConnectionOptions, getConnectionOptions } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";

function initializeExpressServer() {
  const app = express();
  app.use(bodyParser.json());

  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });

  app.listen(process.env.PORT || 3000);

  console.log("Express server has started on port 3000. Open http://localhost:3000 to see results");
}

async function getOptions() {
  let connectionOptions: ConnectionOptions;

  connectionOptions = {
    type: 'postgres',
    synchronize: true,
    logging: false,
    extra: {
      ssl: true,
    },
    entities: [
      process.env.TYPEORM_ENTITIES
    ],
  };
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    connectionOptions = await getConnectionOptions(); 
  }

  return connectionOptions;
};

async function dataBaseConnection(): Promise<void> {
    const typeormconfig = await getOptions();
    await createConnection(typeormconfig).then(initializeExpressServer);
};

dataBaseConnection().then(async () => {
    console.log('Connected to database');
});