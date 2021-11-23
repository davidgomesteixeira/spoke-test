import * as dotenv from 'dotenv';
dotenv.config();
import { createConnection, ConnectionOptions, getConnection } from 'typeorm';

const mockConnection = {
  async create(): Promise<ConnectionOptions> {
    let connectionOptions: ConnectionOptions;
  
    connectionOptions = {
      'name': 'test',
      'type': 'postgres',
      'host': 'localhost',
      'port': 5432,
      'username': 'spoke',
      'password': 'spoke',
      'database': 'spoke_test',
      'synchronize': true,
      'logging': false,
      'entities': [
        process.env.TYPEORM_ENTITIES
      ],
      'migrations': [
        'src/migration/**/*.ts'
      ],
      'subscribers': [
        'src/subscriber/**/*.ts'
      ],
      'cli': {
        'entitiesDir': 'src/entity',
        'migrationsDir': 'src/migration',
        'subscribersDir': 'src/subscriber'
      }
    };
  
    return connectionOptions;
  },

  get() {
    return getConnection('test');
  },

  async close() {
    await getConnection('test').close();
  },

  async clear() {
    const connection = getConnection('test');
    const entities = connection.entityMetadatas;

    if (entities) {
      await Promise.all(entities.map(async function(entity) {
        const respository = connection.getRepository(entity.name);
        await respository.query(`DELETE FROM ${entity.tableName}`);
      }));
    }
  },

  async dataBaseConnection(): Promise<void> {
    const typeormconfig = await mockConnection.create();
    await createConnection(typeormconfig).then(() => console.log('Test database connected'));
  }
}

export { mockConnection };
