import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

const Adventure = sequelize.define(
  'Adventure',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    owner: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.STRING, allowNull: false },
    language: { type: DataTypes.STRING, defaultValue: false },
    img: {type: DataTypes.BLOB('long')},
    pdf: {type: DataTypes.BLOB('long')},
    likes: {type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
)

export default Adventure
