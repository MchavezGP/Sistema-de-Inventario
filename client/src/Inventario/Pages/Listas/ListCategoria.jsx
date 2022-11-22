import { useCategorias } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const ListCategoria = () => {
  const { categorias, deleteCategoria } = useCategorias();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filteredCategorias = () => {
    if (search.length === 0)
      return categorias.slice(currentPage, currentPage + 10);

    const filtered = categorias.filter((categoria) =>
      categoria.nombreCategoria.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      categorias.filter((categoria) =>
        categoria.nombreCategoria.includes(search)
      ).length >
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
      <div className='container text-center'>
        <div className='row'>
          <div className=' col-lg-12 mt-5'>
            <input
              type='text'
              className='mb-2 form-control'
              placeholder='Burcar Categoria'
              value={search}
              onChange={onSearchChange}
            />
            <table className='table table-striped table-hover'>
              <thead className='text-center'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Nombre Categoria</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategorias().map((categoria) => (
                  <tr key={categoria.idCategoria}>
                    <th scope='row'>{categoria.idCategoria}</th>
                    <td>{categoria.nombreCategoria}</td>
                    <td>
                      <button
                        className='btn btn-warning m-2'
                        onClick={() =>
                          navigate(`/editcategoria/${categoria.idCategoria}`)
                        }
                      >
                        Editar
                      </button>

                      <button
                        className='btn btn-danger'
                        onClick={() => deleteCategoria(categoria.idCategoria)}
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
