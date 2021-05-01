import {
    Sequelize,
  } from "sequelize";
import {POSTGRES_URL} from "../config";
import path from 'path';
const fs = require('fs');

export const sequelize = new Sequelize(POSTGRES_URL);

export default async () => {
    
    // await sequelize.drop();

    await sequelize.sync();

    const sql_string = fs.readFileSync(path.resolve("./scripts/init.sql"), 'utf8');

    sequelize.query(sql_string.replace(/(\n)/g, '')).then(() => {
        console.log('init script executed successfully');
    });

    await sequelize.authenticate();

    console.log('Connection has been established successfully.');

}