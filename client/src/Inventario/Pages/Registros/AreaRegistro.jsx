import { FormLayout } from '../../Layout/FormLayout';
import { createAreaRequest } from '../../../api/area.api';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import Swal from 'sweetalert2';
import { useAreas } from '../../../hooks';
export const AreaRegistro = () => {
  const { areas } = useAreas();
  const formik = useFormik({
    initialValues: {
      nombreArea: '',
    },
    validationSchema: YUP.object({
      nombreArea: YUP.string()
        .min(3, 'El nombre tener mas de 3 caracteres')
        .max(20, 'El nombre debe tener maximo  20 caracteres')
        .required('El nombre es requerido'),
    }),

    onSubmit: async (values) => {
      try {
        const soloAreas = areas.map((area)=> area.nombreArea)
        const matches = soloAreas.filter((element)=> {
          return values.nombreArea.toLowerCase() == element.toLowerCase()
        })
        if (matches.length > 0)
          return Swal.fire({
            title: 'Error!',
            text: 'Area ya existe',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        const response = await createAreaRequest(values);

        console.log(values);
        Swal.fire({
          title: 'Success!',
          text: 'Se ha registrado una area',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
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
      <FormLayout titulo='Registro Area'>
        <form onSubmit={formik.handleSubmit}>
          <input
            label='Nombre Area'
            type='text'
            placeholder='Nombre Area'
            name='nombreArea'
            className='form-control my-4 py-2'
            value={formik.values.nombreArea}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nombreArea && formik.errors.nombreArea ? (
            <div className='alert alert-danger'>{formik.errors.nombreArea}</div>
          ) : null}
          <div className='text-center my-5'>
            <button type='submit' className='btn btn-primary btn-lg'>
              Registrar
            </button>
          </div>
        </form>
      </FormLayout>
  );
};
