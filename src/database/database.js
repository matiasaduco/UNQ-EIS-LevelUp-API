import { createConnection } from 'mysql2/promise'
import User from '../models/user.js'
import Character from '../models/character.js'
import Adventure from '../models/adventure.js'

export const createDatabase = async () => {
  // Crea una conexión a MySQL
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
  })

  // Crea la base de datos "levelup"
  await connection.query('CREATE DATABASE IF NOT EXISTS levelup;')
  console.log('Base de datos creada exitosamente.')

  connection.end()
}

export const addDefaultUser = async () => {
  await User.sync()

  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'levelup',
  })

  const defaultUser = {
    username: 'default',
    password: 'default',
    email: 'default@mail.com',
    img: '',
    isWebMaster: true,
  }

  const [rows] = await connection.query(
    'SELECT COUNT(*) AS count FROM User WHERE username = ?',
    [defaultUser.username]
  )
  if (rows[0].count === 0)
    await connection.query('INSERT INTO User SET ?', defaultUser)

  connection.end()
}

export const addDefaultsCharacters = async () => {
  await Character.sync()

  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'levelup',
  })

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
  ]

  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM `Character` WHERE owner = 'default'"
  )
  if (rows[0].count != characters.length) {
    await connection.query('DELETE FROM `Character`')
    await connection.query(
      'INSERT INTO `Character` (fullname, owner, race, class, level, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma, img, biography) VALUES ?',
      [characters]
    )
  }

  connection.end()
}

export const addDefaultAdventures = async () => {
  await Adventure.sync()

  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'levelup',
  })

  const adventures = [
    {
      owner: 'default',
      title: 'Cuentos del Portal Bostezante',
      level: '',
      duration: '',
      language: 'Español',
      img: 'Cuentos Del Portal Bostezante.jpg',
      pdf: 'Cuentos Del Portal Bostezante.pdf',
    },
    {
      owner: 'default',
      title: 'Desde el Abismo',
      level: '',
      duration: '',
      language: 'Español',
      img: 'Desde El Abismo.jpg',
      pdf: 'Desde El Abismo.pdf',
    },
    {
      owner: 'default',
      title: 'La Maldición de Strahd',
      level: '',
      duration: '',
      language: 'Español',
      img: 'La Maldición De Strahd.jpg',
      pdf: 'La Maldición De Strahd.pdf',
    },
    {
      owner: 'default',
      title: 'La Tumba de la Aniquilación',
      level: '',
      duration: '',
      language: 'Español',
      img: 'La Tumba De La Aniquilación.jpg',
      pdf: 'La Tumba De La Aniquilación.pdf',
    },
    {
      owner: 'default',
      title: 'Príncipes del Apocalipsis',
      level: '',
      duration: '',
      language: 'Español',
      img: 'Príncipes Del Apocalipsis.jpg',
      pdf: 'Príncipes Del Apocalipsis.pdf',
    },
  ]

  const defaultAdventures = adventures.map(adventure => [
    adventure.owner,
    adventure.title,
    adventure.level,
    adventure.duration,
    adventure.language,
    adventure.img,
    adventure.pdf,
  ])

  const [rows] = await connection.query(
    'SELECT COUNT(*) AS count FROM Adventure'
  )
  if (rows[0].count === 0)
    await connection.query('INSERT INTO `Adventure` (owner, title, level, duration, language, img, pdf) VALUES ?', [defaultAdventures])

  connection.end()
}
