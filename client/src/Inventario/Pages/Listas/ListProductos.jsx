import { useProductos } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import ProductoPDF from '../PDF/Producto.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useRef } from 'react';
export const ListProductos = () => {
  const { productos, deleteProducto } = useProductos();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'producto',
  });
  const filteredProductos = () => {
    if (search.length === 0)
      return productos.slice(currentPage, currentPage + 10);

    const filtered = productos.filter((producto) =>
      producto.nombreProducto.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      productos.filter((producto) => producto.nombreProducto.includes(search))
        .length >
      currentPage + 10
    )
      setCurrentPage(currentPage + 10);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className=' col-lg-12 mt-5'>

            <h2 className='text-center'>LISTA DE PRODUCTOS</h2>
            <div className='d-flex m-2 align-items-center p-4'>
              <input
                type='text'
                className='mr-auto  form-control align-self-center '
                placeholder='Burcar Producto'
                value={search}
                onChange={onSearchChange}
              />

              <button className='btn btn-primary m-2 align-self-center' onClick={handlePrint}>
                Imprimir
              </button>
            </div>
            <table
              className='table  table-striped  text-center table-hover  '
              ref={componentRef}
            >
              <thead className='thead-dark text-center'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Nombre Prodcuto</th>
                  <th scope='col'>Categoria</th>
                  <th scope='col'>Marca</th>
                  <th scope='col'>Stock</th>
                  <th scope='col'>Fecha</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>

              <tbody className='text-center'>
                {filteredProductos().map(
                  ({ idProducto, nombreProducto, nombreCategoria, nombreMarca, stock, fecha }) => (
                    <tr key={idProducto}>
                      <th scope='row'>{idProducto}</th>
                      <td>{nombreProducto}</td>
                      <td>{nombreCategoria}</td>
                      <td>{nombreMarca}</td>
                      <td
                        className={`table-${
                          stock === 0 ? 'danger' : ''
                        }`}
                        style={{ color: stock === 0 ? 'red' : 'none' }}
                      >
                        {stock}
                      </td>
                      <td>{fecha}</td>

                      <td>
                        <button
                          className='btn btn-warning m-2'
                          onClick={() => navigate(`/editproducto/${idProducto}`)}
                        >
                          Editar
                        </button>

                        <button
                          className='btn btn-danger'
                          onClick={() => deleteProducto(idProducto)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className='d-flex justify-content-center'>
              <nav>
                <ul className='pagination'>
                  <li className='page-item'>
                    <a className='page-link' onClick={prevPage}>
                      Anterior
                    </a>
                  </li>
                  <li className='page-item active'>
                    <a className='page-link'>{currentPage + 1}</a>
                  </li>
                  <li className='page-item'>
                    <a className='page-link' onClick={nextPage}>
                      Siguiente
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
