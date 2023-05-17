import {
  createDatabase,
  addDefaultUser,
  addDefaultsCharacters,
  addDefaultAdventures,
} from './database.js'

export const init = async () => {
  await createDatabase()
  await addDefaultUser()
  await addDefaultsCharacters()
  await addDefaultAdventures()
}

export default init
