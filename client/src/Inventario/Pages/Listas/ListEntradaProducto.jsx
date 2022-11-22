import { useEntrada, useEntradaProducto } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const ListEntradaProducto = () => {
  const { entradasproductos, deleteEntradaProducto} = useEntradaProducto();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filteredEntrada = () => {
    if (search.length === 0)
      return entradasproductos.slice(currentPage, currentPage + 10);

    const filtered = entradasproductos.filter((entrada) =>
      entrada.nombreProducto.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      entradasproductos.filter((entrada) => entrada.nombreProducto.includes(search)).length >
      
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
            <input
              type='text'
              className='mb-2 form-control'
              placeholder='Burcar Producto'
              value={search}
              onChange={onSearchChange}
            />
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>ID Detalle</th>
                  <th scope='col'>ID Producto</th>
                  <th scope='col'>ID Entrada</th>
                  <th scope='col'>Nombre Producto</th>
                  <th scope='col'>Cantidad</th>
                  <th scope='col'>Fecha</th>
                  <th scope='col'>Usuario</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredEntrada().map((entrada) => (
                  <tr key={entrada.idEntradaProducto}>
                    <td>{entrada.idEntradaProducto}</td>
                    <td>{entrada.producto}</td>
                    <td>{entrada.entrada}</td>
                    <td>{entrada.nombreProducto}</td>
                    <td>{entrada.cantidad}</td>
                    <td>{entrada.fecha}</td>
                    <td>{entrada.nombre}</td>

                    <td>
                      <button
                        className='btn btn-warning m-2'
                        onClick={() => navigate(`/edit/${entrada.idEntrada}`)}
                      >
                        Editar
                      </button>

                      <button
                        className='btn btn-danger'
                        onClick={() => deleteEntradaProducto(entrada.idEntradaProducto)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
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

