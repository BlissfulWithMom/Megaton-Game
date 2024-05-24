import { Sequelize, Dialect } from 'sequelize';
import config from '../config/db.config';

const sequelize = new Sequelize({
  username: config.development.username,
  password: config.development.password,
  database: config.development.database,
  host: config.development.host,
  dialect: config.development.dialect as Dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

export default sequelize;
