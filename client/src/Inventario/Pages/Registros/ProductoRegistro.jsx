import { FormLayout } from '../../Layout/FormLayout';
import {
  createProductoRequest,
  updateProductoRequest,
} from '../../../api/producto.api';
import { useMarcas, useCategorias, useProductos } from '../../../hooks';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

export const ProductoRegistro = () => {
  const { marcas } = useMarcas();
  const { productos, getProducto } = useProductos();
  const { categorias } = useCategorias();
  const [producto, setProducto] = useState({
    nombreProducto: '',
    stock: 0,
    fecha: '',
    categoria: '',
    marca: '',
  });
  const params = useParams();

  useEffect(() => {
    const loadProducto = async () => {
      if (params.id) {
        const producto = await getProducto(params.id);
        console.log(producto);
        setProducto({
        nombreProducto: producto.nombreProducto,
        stock: producto.stock,
        fecha: producto.fecha,
        categoria: producto.nombreCategoria,
        marca: producto.nombreMarca,
        })
      }
    };
    loadProducto();
  }, []);

  const formik = useFormik({
    initialValues: 
      producto
    ,
    enableReinitialize: true,
    validationSchema: YUP.object({
      nombreProducto: YUP.string()
        .min(3, 'El nombre tener mas de 3 caracteres')
        .max(20, 'El nombre debe tener maximo  20 caracteres')
        .required('El nombre es requerido'),
      fecha: YUP.date().required('La fecha  es requerida'),
      categoria: YUP.string().required('La categoria es requerida'),
      marca: YUP.string().required('La marca es requerida'),
    }),

    onSubmit: async (values) => {
      try {
        if (params.id) {
          const response = await updateProductoRequest(params.id, values);
          Swal.fire({
            title: 'Success!',
            text: 'Se ha editado un producto',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } else {
          const response = await createProductoRequest(values);
          Swal.fire({
            title: 'Success!',
            text: 'Se ha registrado un producto',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        }
        console.log(values);
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
    <>
      <FormLayout
        titulo={params.id ? 'Editar Producto ' : 'Registrar Producto'}
        className='container mt-5 pt-5'
      >
        <form onSubmit={formik.handleSubmit}>
          <label>Nombre</label>
          <input
            label='Nombre'
            type='text'
            className='form-control my-4 py-2'
            placeholder='Nombre del prodcuto'
            name='nombreProducto'
            value={formik.values.nombreProducto}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nombreProducto && formik.errors.nombreProducto ? (
            <div className='alert alert-danger' role='alert'>
              {formik.errors.nombreProducto}
            </div>
          ) : null}
          <label>Fecha</label>
          <input
            type='date'
            name='fecha'
            className='form-control my-4 py-2'
            value={formik.values.fecha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fecha && formik.errors.fecha ? (
            <div className='alert alert-danger' role='alert'>
              {formik.errors.fecha}
            </div>
          ) : null}
          <label>Categoria</label>
          <select
            label='Categoria'
            name='categoria'
            className='form-control my-4 py-2'
            placeholder='Selecione Categoria'
            value={formik.values.categoria}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
          {formik.touched.categoria && formik.errors.categoria ? (
            <div className='alert alert-danger' role='alert'>
              {formik.errors.categoria}
            </div>
          ) : null}
          <label>Marca</label>
          <select
            label='Marca'
            name='marca'
            className='form-control my-4 py-2'
            value={formik.values.marca}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {marcas.map((marca) => (
              <option key={marca.idMarca} value={marca.idMarca}>
                {marca.nombreMarca}
              </option>
            ))}
          </select>
          {formik.touched.marca && formik.errors.marca ? (
            <div className='alert alert-danger' role='alert'>
              {formik.errors.marca}
            </div>
          ) : null}
          <div className='text-center mt-3'>
            <button type='submit' className='btn btn-primary btn-lg'>
              {params.id ? 'Editar' : 'Registrar'}
            </button>
          </div>
        </form>
      </FormLayout>
    </>
  );
};
