import { createConnection } from 'mysql2/promise';

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

export default createDatabase;
