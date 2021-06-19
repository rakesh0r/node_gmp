import request from 'supertest';
import express from "express";
import groupRouter from "../group";
import { GroupMock, groupMockData } from '../../mocks/models.mock';

const mockGroups = [
  {
      "id": "65327997-42df-4e10-84ef-75776644244c",
      "name": "admin",
      "permissions": [
          "READ"
      ],
      "createdAt": "2021-05-01T11:37:23.899Z",
      "updatedAt": "2021-05-01T11:37:23.899Z"
  }
];

const mockGetGroupById = jest.fn().mockReturnValue(mockGroups[0]);
const mockUpdateGroup = jest.fn().mockReturnValue([1]);
const mockDeleteGroup = jest.fn();
const mockSaveGroup = jest.fn();
const mockAddUsersToGroup = jest.fn();

jest.mock('../../data-access/group', () => {
    return function () {
      return {
        findAll: () => GroupMock.findAll(),
        findByPk: jest.fn().mockImplementation(() => mockGetGroupById()),
        update: jest.fn().mockImplementation(() => mockUpdateGroup()),
        delete: jest.fn().mockImplementation(() => mockDeleteGroup()),
        create: jest.fn().mockImplementation((args) => mockSaveGroup(args)),
        addUsersToGroup: jest.fn().mockImplementation((args) => mockAddUsersToGroup(args)),
      };
    };
});

describe("Test group router", () => {
  let app: any;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(groupRouter);
  });

  it("It should response with groups", async () => {
    const response: any = await request(app).get("/groups");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([groupMockData]);
  });

  it("It should return group with given groupId", async () => {
    const response: any = await request(app).get("/group/65327997-42df-4e10-84ef-75776644244c");
    expect(mockGetGroupById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it("It should update group given group data", async () => {
    const group = {
      "name": "admin",
      "permissions": ["READ"]
    };
    const response: any = await request(app).put("/group/65327997-42df-4e10-84ef-75776644244c").send(group);
    expect(mockUpdateGroup).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it("It should delete group with given group id", async () => {
    const response: any = await request(app).delete("/group/65327997-42df-4e10-84ef-75776644244c");
    expect(mockDeleteGroup).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it("It should throw validation error while creating new group", async () => {
    const group = {
      "name": "admin",
      "permissions": ["READ"]
    };
    const response: any = await request(app).post("/group").send(group);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual([ '"id" is required' ]);
  });

  it("It should create new group with given data", async () => {
    const group = {
      "id": "65327997-42df-4e10-84ef-75776644244c",
      "name": "admin",
      "permissions": ["READ"]
    };
    const response: any = await request(app).post("/group").send(group);
    expect(mockSaveGroup).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it("It should add given users to given group", async () => {
    const addUsersToGroup = {
      "groupId": "65327997-42df-4e10-84ef-7577664644c",
      "userIds": ["30a7863b-7e0a-47b7-8559-6a20cd431ace", "30a7863b-7e0a-47b7-8559-6a20cd431acc"]
    }
    const response: any = await request(app).post("/add-users-to-group").send(addUsersToGroup);
    expect(mockAddUsersToGroup).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });
});
