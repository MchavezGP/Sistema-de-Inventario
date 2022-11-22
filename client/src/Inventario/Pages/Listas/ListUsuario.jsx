import { useUsuarios } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const ListUsuario = () => {
  const { usuarios, deleteMarca } = useUsuarios();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const filteredUsuario = () => {
    if (search.length === 0) return usuarios.slice(currentPage, currentPage + 10);

    const filtered = usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      usuarios.filter((usuario) => usuario.nombre.includes(search)).length >
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
              placeholder='Burcar Usuario'
              value={search}
              onChange={onSearchChange}
            />

            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Nombre</th>
                  <th scope='col'>Apellido Paterno</th>
                  <th scope='col'>Apellido Materno</th>
                  <th scope='col'>Correo</th>
                  <th scope='col'>Contrasena</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsuario().map((usuario) => (
                  <tr key={usuario.idUsuario}>
                    <th scope='row'>{usuario.idUsuario}</th>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellidoPaterno}</td>
                    <td>{usuario.apellidoMaterno}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.contrasena}</td>
                    <td>
                      <button
                        className='btn btn-warning m-2'
                        onClick={() => navigate(`/editmarca/${marca.idMarca}`)}
                      >
                        Editar
                      </button>

                      <button
                        className='btn btn-danger'
                        onClick={() => deleteMarca(marca.idMarca)}
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

