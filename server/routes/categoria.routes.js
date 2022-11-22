import { Router } from 'express';
import { createCategoria, getCategorias, getCategoria, updateCategoria, deleteCategoria } from '../controllers/categoria.controllers.js';
const router = Router();
router.post('/categoria', createCategoria);
router.get('/categoria', getCategorias);
router.get('/categoria/:id', getCategoria);
router.delete('/categoria/:id', deleteCategoria);
router.put('/categoria/:id', updateCategoria);
export default router;