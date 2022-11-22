import { Router } from 'express';
import { createMarca, deleteMarca, getMarcas,getMarca, updateMarca } from '../controllers/marca.controllers.js';
const router = Router();

router.get('/marca', getMarcas);
router.post('/marca', createMarca);
router.get('/marca/:id', getMarca);
router.delete('/marca/:id', deleteMarca);
router.put('/marca/:id', updateMarca);
export default router;