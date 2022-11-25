import { Router } from 'express';
import { createEntradaProducto, getEntradasProductos, deleteEntradaProducto} from '../controllers/entrada_producto.controllers.js';
const router = Router();
router.post('/entradaproducto', createEntradaProducto);
router.get('/entradaproducto', getEntradasProductos);
router.delete('/entradaproducto/:id', deleteEntradaProducto);
export default router;