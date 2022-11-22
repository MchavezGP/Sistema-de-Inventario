import { FormLayout } from '../../Layout/FormLayout';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useCategorias } from '../../../hooks';
import {
  createCategoriaRequest,
  updateCategoriaRequest,
} from '../../../api/categoria.api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
export const CategoriaRegistro = () => {
  const { categorias, getCategoria } = useCategorias();

  const [categoria, setCategoria] = useState({
    nombreCategoria: '',
  });
  const params = useParams();

  useEffect(() => {
    const loadCategoria = async () => {
      if (params.id) {
        const categoria = await getCategoria(params.id);
        console.log(categoria);
        setCategoria({
          nombreCategoria: categoria.nombreCategoria,
        });
      }
    };
    loadCategoria();
  }, []);
  const formik = useFormik({
    initialValues: categoria,
    enableReinitialize: true,
    validationSchema: YUP.object({
      nombreCategoria: YUP.string()
        .min(3, 'El nombre tener mas de 3 caracteres')
        .max(40, 'El nombre debe tener maximo  40 caracteres')
        .required('El nombre es requerido'),
    }),

    onSubmit: async (values) => {
      try {
        const soloCategorias = categorias.map(
          (categoria) => categoria.nombreCategoria
        );
        const matches = soloCategorias.filter((element) => {
          return values.nombreCategoria.toLowerCase() == element.toLowerCase();
        });
        if (matches.length > 0)
          return Swal.fire({
            title: 'Error!',
            text: 'Categoria ya existe',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        if (params.id) {
          const response = await updateCategoriaRequest(params.id, values);
          Swal.fire({
            title: 'Success!',
            text: 'Se ha editado una categoria',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } else {
          const response = await createCategoriaRequest(values);
          Swal.fire({
            title: 'Success!',
            text: 'Se ha registrado una categoria',
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
    <FormLayout titulo='Registro Categoria'>
      <form onSubmit={formik.handleSubmit}>
        <label className='form-floating my-4 p-2'>Categoria</label>
        <input
          label='Nombre'
          type='text'
          placeholder='Nombre Categoria'
          name='nombreCategoria'
          className='form-control my-4 py-2'
          value={formik.values.nombreCategoria}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombreCategoria && formik.errors.nombreCategoria ? (
          <div className='alert alert-danger'>
            {formik.errors.nombreCategoria}
          </div>
        ) : null}
        <div className='text-center'>
          <button type='submit' className='btn btn-primary my-5'>
            Registrar
          </button>
        </div>
      </form>
    </FormLayout>
  );
};
