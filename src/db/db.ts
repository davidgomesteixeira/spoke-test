import * as dotenv from 'dotenv';
dotenv.config();

import { createConnection, ConnectionOptions, getConnectionOptions } from "typeorm";

// Add swagger

class DataBase {
  async getOptions(): Promise<ConnectionOptions> {
    let connectionOptions: ConnectionOptions;
  
    connectionOptions = {
      type: 'postgres',
      synchronize: true,
      logging: false,
      ssl: { rejectUnauthorized: false },
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
  
  async dataBaseConnection(serverConfig: any): Promise<void> {
    const typeormconfig = await this.getOptions();
    await createConnection(typeormconfig).then(serverConfig);
  };
}

export { DataBase };
