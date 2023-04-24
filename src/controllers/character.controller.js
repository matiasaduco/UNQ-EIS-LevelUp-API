import Character from '../models/character.js';

export const getCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll({
      attributes: [
        'id',
        'fullname',
        'owner',
        'race',
        'class',
        'level',
        'img',
        'biography',
      ],
      where: { owner: req.params.owner },
    });
    res.status(200).send(characters);
  } catch (error) {
    res.send({ message: error.message });
  }
};

export const getCharacter = async (req, res) => {
  try {
    const character = await Character.findOne({
      where: { id: req.params.id, owner: req.params.owner },
    });
    res.status(200).send(character);
  } catch (error) {
    res.send({ message: error.message });
  }
};

export const createCharacter = async (req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(200).send({
      message: 'Personaje creado exitosamente!',
      character: character,
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};
