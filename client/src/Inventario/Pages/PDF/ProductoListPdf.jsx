import { useProductos } from '../../../hooks';
export const ProductoListPdf = () => {

  const { productos, deleteProducto } = useProductos();

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className=' col-12 col-sm-7 col-md-6  m-auto mt-4 '>

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
            >
              <thead className='thead-dark text-center'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Nombre Prodcuto</th>
                  <th scope='col'>Stock</th>
                  <th scope='col'>Fecha</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>

              <tbody className='text-center'>
                {filteredProductos().map(
                  ({ idProducto, nombreProducto, stock, fecha }) => (
                    <tr key={idProducto}>
                      <th scope='row'>{idProducto}</th>
                      <td>{nombreProducto}</td>
                      <td
                        className={`table-${
                          stock === 0 ? 'danger' : ''
                        }`}
                        style={{ color: stock === 0 ? 'red' : 'none' }}
                      >
                        {stock}
                      </td>
                      <td>{fecha}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProductoListPdf