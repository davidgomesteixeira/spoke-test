// import * as dotenv from 'dotenv';
// dotenv.config();

// import "reflect-metadata";
// import { createConnection, ConnectionOptions, getConnectionOptions } from "typeorm";
// import { initServer } from './server';
// // Add swagger

// // clean up
// async function getOptions() {
//   let connectionOptions: ConnectionOptions;

//   connectionOptions = {
//     type: 'postgres',
//     synchronize: true,
//     logging: false,
//     ssl: { rejectUnauthorized: false },
//     entities: [
//       process.env.TYPEORM_ENTITIES
//     ],
//   };
//   if (process.env.DATABASE_URL) {
//     Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
//   } else {
//     connectionOptions = await getConnectionOptions(); 
//   }

//   return connectionOptions;
// };

// async function dataBaseConnection(): Promise<void> {
//     const typeormconfig = await getOptions();
//     await createConnection(typeormconfig).then(initServer);
// };

// dataBaseConnection().then(async () => {
//     console.log('Connected to database');
// });
import "reflect-metadata";
import { DataBase } from "./db";
import { ExpressServer } from "./server";

const newExpressServer = new ExpressServer();
const newDataBaseConnection = new DataBase();
newDataBaseConnection.dataBaseConnection(newExpressServer.initServer).then(() => console.log('Database connected'));