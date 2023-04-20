import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('levelup', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
