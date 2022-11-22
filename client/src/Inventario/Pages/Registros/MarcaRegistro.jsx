import { FormLayout } from '../../Layout/FormLayout';
import { createMarcaRequest, updateMarcaRequest } from '../../../api/marca.api';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import Swal from 'sweetalert2';
import { useMarcas } from '../../../hooks';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
export const MarcaRegistro = () => {
  const { marcas, getMarca } = useMarcas();
  const [marca, setMarca] = useState({
    nombreMarca: '',
  });
  const params = useParams();

  useEffect(() => {
    const loadMarca = async () => {
      if (params.id) {
        const marca = await getMarca(params.id);
        console.log(marca);
        setMarca({
          nombreMarca: marca.nombreMarca
        });
      }
    };
    loadMarca();
  }, []);
  const formik = useFormik({
    initialValues: marca,
    enableReinitialize: true,
    validationSchema: YUP.object({
      nombreMarca: YUP.string()
        .min(2, 'El nombre tener mas de 2 caracteres')
        .max(20, 'El nombre debe tener maximo  20 caracteres')
        .required('El nombre es requerido'),
    }),

    onSubmit: async (values) => {
      try {
        const soloMarcas = marcas.map((marca)=> marca.nombreMarca)
        const matches = soloMarcas.filter((element)=> {
          return values.nombreMarca.toLowerCase() == element.toLowerCase()
        })
        if (matches.length > 0)
          return Swal.fire({
            title: 'Error!',
            text: 'Marca ya existe',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        if (params.id) {
          const response = await updateMarcaRequest(params.id, values);
          Swal.fire({
            title: 'Success!',
            text: 'Se ha editado una marca',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } else {
          const response = await createMarcaRequest(values);
          Swal.fire({
            title: 'Success!',
            text: 'Se ha registrado una marca',
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
    <FormLayout titulo={params.id ? 'Editar Marca' : 'Registrar Marca'}>
      <form onSubmit={formik.handleSubmit}>
        <label className='form-floating my-2 p-2'>Marca</label>
        <input
          label='Nombre'
          type='text'
          placeholder='Nombre Marca'
          name='nombreMarca'
          className='form-control my-4 py-2'
          value={formik.values.nombreMarca}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombreMarca && formik.errors.nombreMarca ? (
          <div className='alert alert-danger'>{formik.errors.nombreMarca}</div>
        ) : null}
        <div className='text-center my-5'>
          <button type='submit' className='btn btn-primary btn-lg'>
              {params.id ? 'Editar' : 'Registrar'}
          </button>
        </div>
      </form>
    </FormLayout>
  ); };