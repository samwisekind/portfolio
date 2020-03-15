const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let database;

beforeAll(async () => {
  database = new MongoMemoryServer();
  await mongoose.connect(await database.getConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(() => {
  mongoose.disconnect();
  database.stop();
});

describe('Database', () => {
  it('Database should be mocked', async (done) => {
    const URI = await database.getUri('dumb');
    const port = await database.getPort();

    expect(URI).toBe(`mongodb://127.0.0.1:${port}/dumb?`);

    done();
  });
});
