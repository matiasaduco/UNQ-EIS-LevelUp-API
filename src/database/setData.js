import { createConnection } from 'mysql2/promise';

export const setData = async () => {
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
  await connection.query('INSERT INTO user SET ?', defaultUser);
  connection.end();
};

export default setData;
