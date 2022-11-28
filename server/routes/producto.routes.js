import { Router } from 'express';

import {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
  updateStock,
  getKardex
} from '../controllers/producto.controllers.js';

const router = Router();

router.get('/producto', getProductos);
router.get('/producto/:id', getProducto);
router.get('/kardex', getKardex);
router.post('/producto', createProducto);
router.put('/producto/:id', updateProducto);
router.put('/productostock', updateStock);
router.delete('/producto/:id', deleteProducto);

export default router;
