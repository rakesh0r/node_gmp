import request from 'supertest';
import expressApp from '..';
import {sequelize} from '../loaders'

describe("Test the root path", () => {
  let app: any;

  beforeAll(async () => {
    app = await expressApp();
    console.log(app);
  });

  test("It should response the GET method", async done => {
    const response: any = await request(app)
      .get("/status");
    console.log(response.request.url);
    expect(response.statusCode).toBe(200);
  });

  afterAll((done) => {
    sequelize.close();
    done();
  });
});