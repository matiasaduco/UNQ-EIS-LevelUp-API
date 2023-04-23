import {
  createDatabase,
  addDefaultUser,
  addDefaultsCharacters,
} from './database.js';

export const init = async () => {
  await createDatabase();
  await addDefaultUser();
  await addDefaultsCharacters();
};

export default init;
