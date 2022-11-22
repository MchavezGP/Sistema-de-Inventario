import { useAreas } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const ListArea = () => {
  const { areas, deleteArea } = useAreas();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filteredAreas = () => {
    if (search.length === 0) return areas.slice(currentPage, currentPage + 10);

    const filtered = areas.filter((area) =>
      area.nombreArea.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      areas.filter((area) => area.nombreArea.includes(search)).length >
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
              placeholder='Burcar Area'
              value={search}
              onChange={onSearchChange}
            />
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Nombre Area</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredAreas().map((area) => (
                  <tr key={area.idArea}>
                    <th scope='row'>{area.idArea}</th>
                    <td>{area.nombreArea}</td>
                    <td>
                      <button
                        className='btn btn-warning m-2'
                        onClick={() => navigate(`/edit/${area.idArea}`)}
                      >
                        Editar
                      </button>

                      <button
                        className='btn btn-danger'
                        onClick={() => deleteArea(area.idArea)}
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
