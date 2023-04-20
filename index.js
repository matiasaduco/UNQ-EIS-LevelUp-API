import express from 'express';
import charactersRoutes from './src/routes/character.routes.js';
import sequelize from './src/database/sequelize.js';
import createDatabase from './src/database/database.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import setData from './src/database/setData.js';

export const app = express();
const port = 3010;

await createDatabase();
await setData();
sequelize.sync();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/characters', charactersRoutes);

export const server = app.listen(port, () => {
  console.log('Server open on port: ', port);
});
