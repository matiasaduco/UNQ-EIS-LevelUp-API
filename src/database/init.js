import Adventure from '../models/adventure.js'
import User from '../models/user.js'
import {
  createDatabase,
  addDefaultUser,
  addDefaultsCharacters,
  addDefaultAdventures,
} from './database.js'
import sequelize from './sequelize.js'

export const init = async () => {
  await createDatabase()
  await addDefaultUser()
  await addDefaultsCharacters()
  await addDefaultAdventures()
}

Adventure.belongsToMany(User, { through: 'User_Adventure_Like' })
User.belongsToMany(Adventure, { through: 'User_Adventure_Like' })
sequelize.sync()

export default init
