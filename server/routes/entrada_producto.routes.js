import { Router } from 'express';
import { createEntradaProducto, getEntradasProductos, deleteEntradaProducto} from '../controllers/entrada_producto.controllers.js';
const router = Router();
router.post('/entrada_producto', createEntradaProducto);
router.get('/entrada_producto', getEntradasProductos);
router.delete('/entrada_producto/:id', deleteEntradaProducto);
export default router;