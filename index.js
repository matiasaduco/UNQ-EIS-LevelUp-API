import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import charactersRoutes from './src/routes/character.routes.js';
import adventuresRoutes from './src/routes/adventure.routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import init from './src/database/init.js';

export const app = express();
const port = 3010;

await init();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes)
app.use('/characters', charactersRoutes);
app.use('/adventures', adventuresRoutes);

export const server = app.listen(port, () => {
  console.log('Server open on port: ', port);
});
