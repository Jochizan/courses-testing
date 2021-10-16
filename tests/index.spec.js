import app from '../src/app';
import request from 'supertest';

describe('GET /ping', () => {
  test('should respond with a 200 status code', async () => {
    const res = await request(app).get('/ping').send();

    expect(res.statusCode).toBe(200);
  });

  test('should responf with an array', async () => {
    const res = await request(app).get('/tasks').send();

    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('POST /tasks', () => {
  describe('given a title and description', () => {
    const newTask = {
      title: 'test task',
      description: 'test description'
    };

    // should respond with a 200 status code
    test('should respond with a 200 status code', async () => {
      const res = await request(app).post('/tasks').send(newTask);

      expect(res.statusCode).toBe(200);
    });

    // should respond with a content-type of application/json
    test('should have a content-type: application/json in header', async () => {
      const res = await request(app).post('/tasks').send(newTask);

      expect(res.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    // should with a json object containing the new task with an id
    test('should respond with an task ID', async () => {
      const res = await request(app)
        .post('/tasks')
        .send(newTask)
        .set('Accept', 'application/json');

      expect(res.body.id).toBeDefined();
    });
  });
  describe('when title and description is missing', () => {
    test('should respond with a 400 status code', async () => {
      const fields = [
        {},
        { title: 'Test Task' },
        { description: 'Test description' }
      ];

      for (const body of fields) {
        const res = await request(app).post('/tasks').send(body);
        expect(res.statusCode).toBe(400);
      }
    });
  });
});
