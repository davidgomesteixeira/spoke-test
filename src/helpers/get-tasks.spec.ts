import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { mockConnection } from '../tests/mockConnection';
import { Connection, ConnectionManager, Repository, getRepository } from 'typeorm';
import { getTasks } from './get-tasks';
import { Task } from '../entity/Task';

const expect = chai.expect;

const mockQuery = {};
let connection: Connection;

describe.skip('postService => getById', () => {
  const sandbox = sinon.createSandbox();
  
  beforeEach( async () => {
    connection = await mockConnection.dataBaseConnection() as any;
    sandbox.stub(ConnectionManager.prototype, 'get').returns({
      getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository))
    } as unknown as Connection);
    // const mockTaskRespository = getRepository(Task);
    // const mockFind = sinon.stub(mockTaskRespository, 'find'); // Already stubbed from line 22? Connect doesn't work without line 21-23
  })

  afterEach(async () => {
    await mockConnection.clear();
    sandbox.restore();
  })

  it('getById method passed', async () => {
    const tasks = {
      id: 1,
      tasks: 'Let\'s get some stuff done',
      status: 'in progress'
    };

    const result = await getTasks(mockQuery);
    expect(result).to.deep.equal(tasks);
  })

  after(async function() {
    mockConnection.close();
  })
})