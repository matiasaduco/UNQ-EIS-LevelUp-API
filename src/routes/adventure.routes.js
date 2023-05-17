import { Router } from 'express'
import {
  getAdventures,
  createAdventure,
  editAdventure,
  deleteAdventure,
} from '../controllers/adventure.controller.js'

const router = Router()

router.get('/', getAdventures)
router.post('/create', createAdventure)
router.put('/edit', editAdventure)
router.delete('/delete/:id', deleteAdventure)

export default router
