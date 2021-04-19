import {
    Model,
    DataTypes,
  } from "sequelize";
import { UserAttributes } from "../types/userAttributes";
import db from './';

interface UserInstance
  extends Model<UserAttributes>,
    UserAttributes {}

const UserModel = db.define<UserInstance>("users", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    login: {
      type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
    },
}, {
    timestamps: false
});

export default UserModel;
