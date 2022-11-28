import { useKardex } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const ListKardex = () => {
  const { kardex } = useKardex();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "producto",
  });

  const filteredKardex = () => {
    if (search.length === 0) return kardex.slice(currentPage, currentPage + 10);

    const filtered = kardex.filter((k) =>
      k.nombreProducto.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      kardex.filter((k) => k.nombreProducto.includes(search)).length >
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
      <div className="container">
        <div className="row">
          <div className=" col-lg-12 mt-5">
            <h2 className="text-center">REPORTE</h2>
            <div className="d-flex m-2 align-items-center p-4">
              <input
                type="text"
                className="mr-auto  form-control align-self-center "
                placeholder="Burcar Producto"
                value={search}
                onChange={onSearchChange}
              />
              <button
                className="btn btn-primary m-2 align-self-center"
                onClick={handlePrint}
              >
                Imprimir
              </button>
            </div>
            <table
              className="table table-striped table-hover text-center"
              ref={componentRef}
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre Producto</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Cantidad Ingreso</th>
                  <th scope="col">Cantidad Salida</th>
                </tr>
              </thead>

              <tbody>
                {filteredKardex().map((kardex) => (
                  <tr key={kardex.idProducto}>
                    <th scope="row">{kardex.idProducto}</th>
                    <td>{kardex.nombreProducto}</td>
                    <td>{kardex.nombreMarca}</td>
                    <td>{kardex.nombreCategoria}</td>
                    <td>{kardex.stock}</td>
                    <td>{kardex.cantidadingreso}</td>
                    <td>{kardex.cantidadsalida}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={prevPage}>
                      Anterior
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link">{currentPage + 1}</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" onClick={nextPage}>
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
