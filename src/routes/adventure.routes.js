import { Router } from 'express'
import {
  getAdventures,
  createAdventure,
  editAdventure,
  deleteAdventure,
  likeAdventure,
  unlikeAdventure,
} from '../controllers/adventure.controller.js'
import multer from 'multer'

const router = Router()
const fileUpload = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'img', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
])

router.get('/', getAdventures)
router.post('/create', fileUpload, createAdventure)
router.put('/edit', editAdventure)
router.delete('/delete/:id', deleteAdventure)
router.put('/increment', likeAdventure)
router.put('/decrement', unlikeAdventure)

export default router
