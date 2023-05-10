import { Router } from 'express'
import {
  getCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
  editCharacter
} from '../controllers/character.controller.js'

const router = Router()

router.get('/:owner', getCharacters)
router.get('/:owner/:id', getCharacter)

router.post('/create', createCharacter)

router.put('/edit', editCharacter)

router.delete('/delete/:id', deleteCharacter)

export default router
