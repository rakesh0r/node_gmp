import {
    Model,
    DataTypes,
  } from "sequelize";
import { UserAttributes } from "../types/userAttributes";
import { sequelize } from '../loaders/sequelize';
import Group from './group';
interface UserInstance
  extends Model<UserAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>("User", {
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

User.belongsToMany(Group, { through: 'UserGroup' });
Group.belongsToMany(User, { through: 'UserGroup' });

export default User;
