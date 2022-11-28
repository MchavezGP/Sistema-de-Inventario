import { Routes, Route } from 'react-router-dom';
import {
  CategoriaRegistro,
  SalidaRegistro,
  ProductoRegistro,
  MarcaRegistro,
  AreaRegistro,
  InicioSesionPage,
  EntradaProductoRegistro,
  ProductoSalidaRegistro,
  UsuarioRegistro,
} from '../Inventario/Pages/Registros';
import {
  ListProductos,
  ListEntrada,
  ListEntradaProducto,
  ListProductoSalida,
  ListSalida,
  ListCategoria,
  ListMarca,
  ListArea,
  ListUsuario,
  ListKardex
} from '../Inventario/Pages/Listas';
import { EntradaRegistro } from '../Inventario/Pages/Registros/EntradaRegistro';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/*' element={<ProductoRegistro />} />
      <Route path='/editproducto/:id' element={<ProductoRegistro />} />
      <Route path='/editmarca/:id' element={<MarcaRegistro />} />
      <Route path='/editcategoria/:id' element={<CategoriaRegistro />} />
      <Route path='/list' element={<ListProductos />} />
      <Route path='/categorialist' element={<ListCategoria />} />
      <Route path='/marcalist' element={<ListMarca />} />
      <Route path='/entradalist' element={<ListEntrada />} />
      <Route path='/kardexlist' element={<ListKardex />} />
      <Route path='/entradaproductolist' element={<ListEntradaProducto />} />
      <Route path='/productosalidalist' element={<ListProductoSalida />} />
      <Route path='/arealist' element={<ListArea />} />
      <Route path='/salidalist' element={<ListSalida />} />
      <Route path='/usuariolist' element={<ListUsuario/>} />
      <Route path='/marca' element={<MarcaRegistro />} />
      <Route path='/categoria' element={<CategoriaRegistro />} />
      <Route path='/entradaregistro' element={<EntradaRegistro />} />
      <Route
        path='/entradaproductoregistro'
        element={<EntradaProductoRegistro />}
      />
      <Route
        path='/productosalidaregistro'
        element={<ProductoSalidaRegistro />}
      />
      <Route path='/area' element={<AreaRegistro />} />
      <Route path='/salida' element={<SalidaRegistro />} />
      <Route path='/login' element={<InicioSesionPage />} />
      <Route path='/registro' element={<UsuarioRegistro />} />
    </Routes>
  );
};
