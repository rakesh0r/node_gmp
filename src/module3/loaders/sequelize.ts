import {
    Sequelize,
  } from "sequelize";
import Logger from './logger';
import config from "../config";
import path from 'path';
const fs = require('fs');

export const sequelize = new Sequelize(config.databaseURL);

export default async () => {
    
    // await sequelize.drop();

    await sequelize.sync();

    const sql_string = fs.readFileSync(path.resolve("./scripts/init.sql"), 'utf8');

    sequelize.query(sql_string.replace(/(\n)/g, '')).then(() => {
        Logger.info('init script executed successfully');
    });

    await sequelize.authenticate();

    Logger.info('Connection has been established successfully.');

}