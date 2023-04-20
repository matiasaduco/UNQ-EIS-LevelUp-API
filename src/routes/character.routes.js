import { Router } from 'express';
import {
  getCharacters,
  getCharacter,
  createCharacter,
} from '../controllers/character.controller.js';

const router = Router();

router.get('/:owner', getCharacters);
router.get('/:owner/:id', getCharacter);

router.post('/create', createCharacter);

export default router;
