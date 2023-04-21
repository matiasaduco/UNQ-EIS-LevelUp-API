import {
  createDatabase,
  addDefaultUser,
  addDefaultsCharacters,
} from './database.js';
import User from '../models/user.js';
import Character from '../models/character.js';

export const init = async () => {
  await createDatabase();
  await User.sync();
  await Character.sync();
  await addDefaultUser();
  await addDefaultsCharacters();
};

export default init;
