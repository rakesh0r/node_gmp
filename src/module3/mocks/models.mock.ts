// Import the mock library
var SequelizeMock = require('sequelize-mock');

// Setup the mock database connection
var DBConnectionMock = new SequelizeMock();

const userMockData = {
    "id": "30a7863b-7e0a-47b7-8559-6a20cd431ace",
    "login": "peter",
    "password": "rakesh",
    "age": 20,
    "isdeleted": false
};

const groupMockData = {
    "id": "65327997-42df-4e10-84ef-75776644244c",
    "name": "admin",
    "permissions": [
        "READ"
    ],
    "createdAt": "2021-05-01T11:37:23.899Z",
    "updatedAt": "2021-05-01T11:37:23.899Z"
};

// Define our Model
const UserMock = DBConnectionMock.define('User', userMockData, {
    timestamps: false
});

// You can also associate mock models as well
var GroupMock = DBConnectionMock.define('Groups', groupMockData);

UserMock.belongsToMany(GroupMock, { through: 'UserGroup' });
GroupMock.belongsToMany(UserMock, { through: 'UserGroup' });


export {
    UserMock,
    GroupMock,
    groupMockData,
    userMockData,
}
