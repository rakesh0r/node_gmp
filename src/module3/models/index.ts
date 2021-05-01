import {
    Sequelize,
  } from "sequelize";
import {POSTGRES_URL} from "../config";
import path from 'path';

const fs = require('fs');

const db = new Sequelize(POSTGRES_URL);

const sql_string = fs.readFileSync(path.resolve("./scripts/init.sql"), 'utf8');

db.query(sql_string.replace(/(\n)/g, '')).then(() => {
    console.log('init script executed successfully');
});

export default db;

export * from './user';