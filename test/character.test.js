import { test, beforeEach, afterAll, jest } from '@jest/globals';
import supertest from 'supertest';
import { app, server } from '..';
import Character from '../src/models/character';

const CharacterList = [
  {
    fullname: 'Personaje 1',
    owner: 'test',
    race: 'Humano',
    class: 'Mago',
    level: '19',
  },
  {
    fullname: 'Personaje 2',
    owner: 'test',
    race: 'Enano',
    class: 'Guerrero',
    level: '13',
  },
];

const api = supertest(app);
jest.mock('../src/models/character.js');

beforeEach(() => {
  Character.findAll.mockReset();
  Character.findOne.mockReset();
});

afterAll(() => {
  server.close();
});

describe('Test de Usuarios', () => {
  test('Obtener todos los usuarios', async () => {
    Character.findAll.mockReturnValueOnce(CharacterList);
    await api.get('/characters/default').expect(CharacterList);
  });

  test('Obtener un usuario en partícular', async () => {
    Character.findOne.mockReturnValueOnce(CharacterList[0]);
    await api.get('/characters/default/1').expect(CharacterList[0]);
  });

  test('Crear un personaje', async () => {
    const character = { fullname: 'Personaje 1', owner: 'default' };

    await api
      .post('/characters/create')
      .send(character)
      .expect({ message: 'Personaje creado exitosamente!' });
  });
});
