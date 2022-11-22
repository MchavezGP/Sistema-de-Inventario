import { Router } from 'express';
import { createEntrada , deleteEntrada, getEntradas } from '../controllers/entrada.controllers.js';
const router = Router();
router.post('/entrada', createEntrada);
router.get('/entrada', getEntradas);
router.delete('/entrada/:id', deleteEntrada);
export default router;