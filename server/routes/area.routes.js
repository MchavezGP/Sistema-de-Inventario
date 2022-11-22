import { Router } from 'express';
import { createArea, getAreas, deleteArea} from '../controllers/area.controllers.js';
const router = Router();
router.post('/area', createArea);
router.get('/area', getAreas);
router.delete('/area/:id', deleteArea);
export default router;