import { createConnection } from 'mysql2/promise';
import User from '../models/user.js';
import Character from '../models/character.js';

export const createDatabase = async () => {
  // Crea una conexión a MySQL
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
  });

  // Crea la base de datos "levelup"
  await connection.query('CREATE DATABASE IF NOT EXISTS levelup;');
  console.log('Base de datos creada exitosamente.');

  connection.end();
};

export const addDefaultUser = async () => {
  await User.sync();

  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'levelup',
  });

  const defaultUser = {
    username: 'default',
    password: 'default',
    email: 'default@mail.com',
    img: '',
    isWebMaster: true,
  };

  const [rows] = await connection.query(
    'SELECT COUNT(*) AS count FROM User WHERE username = ?',
    [defaultUser.username]
  );
  if (rows[0].count === 0)
    await connection.query('INSERT INTO User SET ?', defaultUser);

  connection.end();
};

export const addDefaultsCharacters = async () => {
  await Character.sync();

  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'levelup',
  });

  const characters = [
    [
      'Matias Aduco',
      'default',
      'Humano',
      'Mago',
      '19',
      'Caótio Bueno',
      '10',
      '8',
      '12',
      '14',
      '15',
      '13',
      'human_m',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    [
      'Lucas Alvarez',
      'default',
      'Enano',
      'Bardo',
      '7',
      'Caótio Bueno',
      '12',
      '8',
      '10',
      '13',
      '14',
      '15',
      'dwarf_m',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  ];

  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM `Character` WHERE owner = 'default'"
  );
  if (rows[0].count != characters.length) {
    await connection.query('DELETE FROM `Character`');
    await connection.query(
      'INSERT INTO `Character` (fullname, owner, race, class, level, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma, img, biography) VALUES ?',
      [characters]
    );
  }

  connection.end();
};
