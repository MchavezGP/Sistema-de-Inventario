import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import Swal from 'sweetalert2';
import { createUserRequest } from '../../../api/auth.api';
import { FormLayout } from '../../Layout/FormLayout';
import { useUsuarios } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
export const UsuarioRegistro = () => {
  const { usuarios } = useUsuarios();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
      contrasena: '',
    },
    validationSchema: YUP.object({
      nombre: YUP.string()
        .min(3, 'El nombre tener mas de 3 caracteres')
        .max(20, 'El nombre debe tener maximo  20 caracteres')
        .required('El nombre es requerido'),
      apellidoPaterno: YUP.string()
        .min(3, 'El apellido paterno tener mas de 3 caracteres')
        .max(20, 'El apellido paterno debe tener maximo  20 caracteres'),
      apellidoMaterno: YUP.string()
        .min(3, 'El apellido materno debe tener mas de 3 caracteres')
        .max(20, 'El apellido materno debe tener maximo  20 caracteres')
        .required('El nombre es requerido'),
      correo: YUP.string()
        .email()
        .required('El nombre es requerido'),
      contrasena: YUP.string()
        .min(3, 'La contraseña tener mas de 4 caracteres')
        .max(20, 'La contraseña debe tener maximo  12 caracteres')
        .required('La contraseña es requerido'),
    }),

    onSubmit: async (values) => {
      console.log(values);
      try {
        if (usuarios.find((usuario) => usuario.correo === values.correo))
          return Swal.fire({
            title: 'Error!',
            text: 'Usuario ya existe',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        const response = await createUserRequest(values);
        navigate("/login");
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <FormLayout titulo='Registro'>
      <form onSubmit={formik.handleSubmit}>
        <label>Nombre</label>
        <input
          label='Nombre'
          type='text'
          placeholder='Nombre '
          name='nombre'
          className='form-control my-4 py-2'
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombre && formik.errors.nombre ? (
          <div className='alert alert-danger'>{formik.errors.nombre}</div>
        ) : null}

        <label>Apellido Paterno</label>
          <input
            label='Apellido Paterno'
            type='text'
            placeholder='Apellido Paterno'
            name='apellidoPaterno'
            className='form-control my-4 py-2'
            value={formik.values.apellidoPaterno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.apellidoPaterno && formik.errors.apellidoMaterno ? (
            <div className='alert alert-danger'>
              {formik.errors.apellidoPaterno}
            </div>
          ) : null}
        <label>Apellido Materno</label>
          <input
            label='Apellido Materno'
            type='text'
            placeholder='Apellido Materno'
            name='apellidoMaterno'
            className='form-control my-4 py-2'
            value={formik.values.apellidoMaterno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.apellidoMaterno && formik.errors.apellidoMaterno ? (
            <div className='alert alert-danger'>
              {formik.errors.apellidoMaterno}
            </div>
          ) : null}
        <label>Correo</label>
          <input
            label='Correo'
            type='email'
            name='correo'
            placeholder='correo@email.com'
            className='form-control my-4 py-2'
            value={formik.values.correo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.correo && formik.errors.correo ? (
            <div className='alert alert-danger'>{formik.errors.correo}</div>
          ) : null}
        <label>Contraseña</label>
          <input
            label='Contraseña'
            type='password'
            name='contrasena'
            placeholder='********'
            className='form-control my-4 py-2'
            value={formik.values.contrasena}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contrasena && formik.errors.contrasena ? (
            <div className='alert alert-danger'>{formik.errors.contrasena}</div>
          ) : null}
          <div className='d-flex flex-column'>
            <button type='submit'className='btn btn-primary mb-2'>Crear Cuenta</button>
            <RouterLink to='/login' className='btn btn-primary'>
              Ingresar
            </RouterLink>
        </div>
      </form>
    </FormLayout>
  );
};
