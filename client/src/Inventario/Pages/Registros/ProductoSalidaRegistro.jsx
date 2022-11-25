import { useProductos, useSalida } from '../../../hooks';
import { createProductoSalidaRequest } from '../../../api/productosalida.api';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import * as YUP from 'yup';
import Swal from 'sweetalert2';
import { FormLayout } from '../../Layout/FormLayout';
export const ProductoSalidaRegistro = () => {
  const { productos } = useProductos();
  const { salidas } = useSalida();
  const [productoFiltered, setProductoFiltered] = useState([]);
  const [idSalida, setIdSalida] = useState('');
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setIdSalida(salidas.length > 0 ? salidas.at(-1).idSalida : '');
  }, [salidas]);

  const filtrarProducto = (idProducto, cantidad) => {
    const filtered = productos.find(
      (producto) => producto.idProducto == idProducto
    );
    if (productoFiltered.find((producto) => producto.idProducto == idProducto))
      return Swal.fire({
        title: 'Error!',
        text: 'Producto ya agregado',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    const producto = productos.find(
      (producto) => producto.idProducto == idProducto
    );
    const stock = producto.stock;
    if (cantidad > stock)
      return Swal.fire({
        title: 'Error!',
        text: 'Stock insuficiente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    setProductoFiltered([...productoFiltered, filtered]);
  };

  const addProducto = (newProducto) => {
    if (product.find((producto) => producto.producto === newProducto.producto))
      return;
    const producto = productos.find(
      (producto) => producto.idProducto == newProducto.producto
    );
    const stock = producto.stock;
    if (newProducto.cantidad > stock) return;
    setProduct([newProducto, ...product]);
  };

  const resetProducto = () => {
    setProduct([]);
    setProductoFiltered([]);
  };

  const registerProducto = async () => {
    try {
      if (product.length === 0) {
        return Swal.fire({
          title: 'Error!',
          text: 'Agrega un producto',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
      const registerproducto = await Promise.all(
        product.map(async (producto) => {
          await createProductoSalidaRequest(producto);
          setProduct([]);
          setProductoFiltered([]);
          return Swal.fire({
            title: 'Success!',
            text: 'Se ha registrado un detalle',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        })
      );
    } catch (error) {
      return Swal.fire({
        title: 'Error!',
        text: { error },
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      cantidad: '',
      producto: '',
      salida: idSalida,
    },
    enableReinitialize: true,
    validationSchema: YUP.object({
      cantidad: YUP.number()
        .required('La cantidad es requerida')
        .positive('El numero debe ser valido'),
      producto: YUP.string().required('El producto es requerido'),
    }),

    onSubmit: (values) => {
      try {
        // getStockProducto(values.producto, values.cantidad);
        addProducto(values);
        filtrarProducto(values.producto, values.cantidad);

        formik.resetForm();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: { error },
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    },
  });
  return (
    <FormLayout titulo='Agregar Producto a Salida'>
      <form onSubmit={formik.handleSubmit}>
        <h3>Ultima Salida:</h3>
        <h4>{idSalida}</h4>
        <label>Cantidad</label>
        <input
          type='number'
          placeholder='Cantidad'
          name='cantidad'
          className='form-control my-4 py-2'
          value={formik.values.cantidad}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.cantidad && formik.errors.cantidad ? (
          <div className='alert alert-danger' role='alert'>
            {formik.errors.cantidad}
          </div>
        ) : null}
        <label>Producto</label>
        <select
          label='Producto'
          name='producto'
          className='form-control my-4 py-2'
          value={formik.values.producto}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {productos.map(
            ({
              idProducto,
              nombreProducto,
              nombreMarca,
              nombreCategoria,
              stock,
            }) => {
              if (stock > 0) {
                return (
                  <option key={idProducto} value={idProducto}>
                    {nombreProducto + '-' + nombreCategoria + '-' + nombreMarca}
                  </option>
                );
              }
            }
          )}
        </select>
        {formik.touched.producto && formik.errors.producto ? (
          <div className='alert alert-danger'>{formik.errors.producto}</div>
        ) : null}
        <div>
          <button type='submit' className='btn btn-primary m-4'>
            Agregar
          </button>
          <button
            type='submit'
            className='btn btn-primary m-4'
            onClick={resetProducto}
          >
            Limpiar
          </button>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Nombre Producto</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Categoria</th>
              <th scope='col'>Marca</th>
            </tr>
          </thead>
          <tbody>
            {productoFiltered.map(
              ({
                idProducto,
                nombreProducto,
                stock,
                nombreCategoria,
                nombreMarca,
              }) => (
                <tr key={idProducto}>
                  <th scope='row'>{idProducto}</th>
                  <td>{nombreProducto}</td>
                  <td>{stock}</td>
                  <td>{nombreCategoria}</td>
                  <td>{nombreMarca}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </form>
      {product.length > 0 ? (
        <button className='btn btn-primary' onClick={registerProducto}>
          Registrar Productos
        </button>
      ) : null}
    </FormLayout>
  );
};
