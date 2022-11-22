import { useEntrada } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const ListEntrada = () => {
  const { entradas, deleteEntrada} = useEntrada();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filteredEntrada = () => {
    if (search.length === 0)
      return entradas.slice(currentPage, currentPage + 10);

    const filtered = entradas.filter((entrada) =>
      entrada.fecha.includes(search)
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      entradas.filter((entrada) => entrada.nombre.includes(search)).length >
      
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
              placeholder='Burcar una entrada por fecha'
              value={search}
              onChange={onSearchChange}
            />
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>ID Entrada</th>
                  <th scope='col'>Fecha</th>
                  <th scope='col'>Usuario</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredEntrada().map((entrada) => (
                  <tr key={entrada.idEntrada}>
                    <td>{entrada.idEntrada}</td>
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
                        onClick={() => deleteEntrada(entrada.idEntrada)}
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
