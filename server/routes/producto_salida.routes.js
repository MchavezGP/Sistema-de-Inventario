import { Router } from 'express';
import {  createProductoSalida, getProductosSalidas, deleteProductoSalida } from '../controllers/producto_salida.controllers.js';
const router = Router();
router.post('/productosalida', createProductoSalida);
router.get('/productossalidas', getProductosSalidas);
router.delete('/productosalida/:id', deleteProductoSalida);
export default router;