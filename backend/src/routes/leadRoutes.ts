import { Router } from 'express'
import { leadController } from '../controllers/leadController'

const router = Router()

router.get('/', leadController.getAll)
router.get('/:id', leadController.getById)
router.post('/', leadController.create)
router.put('/:id', leadController.update)
router.delete('/:id', leadController.delete)

export default router
