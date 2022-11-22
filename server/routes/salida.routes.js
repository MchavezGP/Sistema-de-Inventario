
import { Router } from 'express';
import { createSalida, getSalidas, deleteSalida} from '../controllers/salida.controllers.js';
const router = Router();
router.post('/salida', createSalida);
router.get('/salida', getSalidas);
router.delete('/salida/:id', deleteSalida);
export default router;