import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Character = sequelize.define(
  'Character',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    race: { type: DataTypes.STRING, allowNull: false },
    class: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.INTEGER, allowNull: false },
    // background: { type: DataTypes.STRING, allowNull: false },
    alignment: { type: DataTypes.STRING, allowNull: false },
    // exp_points: { type: DataTypes.INTEGER, allowNull: false },
    strength: { type: DataTypes.INTEGER, allowNull: false },
    dexterity: { type: DataTypes.INTEGER, allowNull: false },
    constitution: { type: DataTypes.INTEGER, allowNull: false },
    intelligence: { type: DataTypes.INTEGER, allowNull: false },
    wisdom: { type: DataTypes.INTEGER, allowNull: false },
    charisma: { type: DataTypes.INTEGER, allowNull: false },
    // personality_traits: { type: DataTypes.STRING, allowNull: false },
    // ideals: { type: DataTypes.STRING, allowNull: false },
    // bonds: { type: DataTypes.STRING, allowNull: false },
    // flaws: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    biography: { type: DataTypes.STRING, allowNull: true },
  },
  {
    freezeTableName: true,
  }
);

export default Character;
