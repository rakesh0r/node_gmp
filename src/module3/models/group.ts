import {
    Model,
    DataTypes,
  } from "sequelize";
import { Group as GroupAttributes, Permission } from "../types";
import { sequelize } from '../loaders/sequelize';
import User from './user';

interface GroupInstance
  extends Model<GroupAttributes>,
  GroupAttributes {}

const Group = sequelize.define<GroupInstance>("Group", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  }
});

export default Group;
