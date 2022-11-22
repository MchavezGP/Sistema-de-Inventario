import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import indexRoutes from './routes/index.routes.js';
import categoriaRoutes from './routes/categoria.routes.js'
import marcaRoutes from './routes/marca.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'
import areaRoutes from './routes/area.routes.js'
import entradaRoutes from './routes/entrada.routes.js'
import salidaRoutes from './routes/salida.routes.js'
import productoRoutes from './routes/producto.routes.js'
import productosalidaRoutes from './routes/producto_salida.routes.js'
import entradaproductoRoutes from './routes/entrada_producto.routes.js'
import authRoutes from './routes/auth.routes.js'
const app = express();
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(categoriaRoutes);
app.use(marcaRoutes);
app.use(authRoutes);
app.use(entradaRoutes);
app.use(salidaRoutes);
app.use(areaRoutes);
app.use(productoRoutes);
app.use(usuarioRoutes);
app.use(productosalidaRoutes);
app.use(entradaproductoRoutes);
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
