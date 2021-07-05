import request from 'supertest';
import express from "express";
import userRouter from "../user";
import { UserMock, userMockData } from '../../mocks/models.mock';

const mockUsers = [
  {
      "id": "30a7863b-7e0a-47b7-8559-6a20cd431ace",
      "login": "peter",
      "password": "rakesh",
      "age": 20,
      "isdeleted": false,
      "Groups": [
          {
              "id": "65327997-42df-4e10-84ef-75776644244c",
              "name": "admin",
              "permissions": [
                  "READ"
              ],
              "createdAt": "2021-05-01T11:37:23.899Z",
              "updatedAt": "2021-05-01T11:37:23.899Z",
              "UserGroup": {
                  "createdAt": "2021-05-01T11:37:27.478Z",
                  "updatedAt": "2021-05-01T11:37:27.478Z",
                  "UserId": "30a7863b-7e0a-47b7-8559-6a20cd431ace",
                  "GroupId": "65327997-42df-4e10-84ef-75776644244c"
              }
          }
      ]
  }
];

const mockGetUserById = jest.fn().mockReturnValue(mockUsers[0]);
const mockUpdateUser = jest.fn().mockReturnValue([1]);
const mockDeleteUser = jest.fn();
const mockSaveUser = jest.fn();

jest.mock('../../data-access/users', () => {
    return function () {
      return {
        getUsers: () => UserMock.findAll(),
        getUserById: jest.fn().mockImplementation(() => mockGetUserById()),
        updateUser: jest.fn().mockImplementation(() => mockUpdateUser()),
        deleteUser: jest.fn().mockImplementation(() => mockDeleteUser()),
        saveUser: jest.fn().mockImplementation((args) => mockSaveUser(args)),
      };
    };
});

describe("Test user router", () => {
  let app: any;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(userRouter);
  });

  it("It should response with users", async () => {
    const response: any = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([userMockData]);
  });

  it("It should return user with given userId", async () => {
    const response: any = await request(app).get("/users/30a7863b-7e0a-47b7-8559-6a20cd431ace");
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it("It should throw validation error for given user", async () => {
    const user = {
      login: "string13max",
      password: "string",
      age: 18,
      isdeleted: false
    };
    const response: any = await request(app).put("/users/30a7863b-7e0a-47b7-8559-6a20cd431ace").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual([ '"id" is required' ]);
  });

  it("It should update user given user data", async () => {
    const user = {
      id: "30a7863b-7e0a-47b7-8559-6a20cd431ace",
      login: "string13max",
      password: "string",
      age: 18,
      isdeleted: false
    };
    const response: any = await request(app).put("/users/30a7863b-7e0a-47b7-8559-6a20cd431ace").send(user);
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it("It should delete user with given user id", async () => {
    const response: any = await request(app).delete("/users/30a7863b-7e0a-47b7-8559-6a20cd431ace");
    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it("It should throw validation error while creating new user", async () => {
    const user = {
      "login": "string13max",
      "password": "string",
      "age": 18,
      "isdeleted": false
    };
    const response: any = await request(app).post("/users").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual([ '"id" is required' ]);
  });

  it("It should create new user with given data", async () => {
    const user = {
      "id": "30a7863b-7e0a-47b7-8559-6a20cd431ace",
      "login": "string13max",
      "password": "string",
      "age": 18,
      "isdeleted": false
    };
    const response: any = await request(app).post("/users").send(user);
    expect(mockSaveUser).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });
});
