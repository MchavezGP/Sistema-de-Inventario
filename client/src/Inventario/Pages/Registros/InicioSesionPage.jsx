import { Link as RouterLink } from 'react-router-dom';
import { FormLayout } from '../../Layout/FormLayout';
import { LoginRequest } from '../../../api/auth.api';
import { useFormik } from 'formik';
import * as YUP from 'yup';
export const InicioSesionPage = () => {
  const formik = useFormik({
    initialValues: {
      correo: '',
      contrasena: '',
    },
    validationSchema: YUP.object({
      correo: YUP.string().email().required('El nombre es requerido'),
      contrasena: YUP.string().required('La contraseña es requerido'),
    }),

    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await LoginRequest(values);
        navigate('/');
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <FormLayout titulo='Inicio de Sesion'>
      <form>
        <label>Correo</label>
        <input
          label='Correo'
          type='email'
          name='correo'
          placeholder='correo@email.com'
          className='form-control my-4 py-2'
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <label>Contraseña</label>
        <input
          label='Contraseña'
          type='password'
          placeholder='********'
          name='contrasena'
          className='form-control my-4 py-2'
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className='d-flex flex-column'>
          <button type='submit' className='btn btn-primary mb-2'>Iniciar Sesion</button>
          <RouterLink
            color='inherit'
            to='/registro'
            className='btn btn-primary'
          >
            Crear una cuenta
          </RouterLink>
        </div>
      </form>
    </FormLayout>
  );
};
