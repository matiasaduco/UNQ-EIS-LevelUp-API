import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const User = sequelize.define(
  'User',
  {
    username: { type: DataTypes.STRING, primaryKey: true },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    isWebMaster: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);

export default User;
