import { FormLayout } from '../../Layout/FormLayout';
import { createSalidaRequest } from '../../../api/salida.api';
import { useUsuarios, useAreas } from '../../../hooks';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as YUP from 'yup';
import Swal from 'sweetalert2';
export const SalidaRegistro = () => {
  const { areas } = useAreas();
  const { usuarios } = useUsuarios();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fecha: '',
      usuarioSalida: '',
      area: '',
    },
    validationSchema: YUP.object({
      fecha: YUP.date().required('La fecha  es requerida'),
      usuarioSalida: YUP.number().required('El usuario  es requerido'),
      area: YUP.string().required('El area es requerido'),
    }),

    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await createSalidaRequest(values);
        navigate("/productosalidaregistro");
        Swal.fire({
          title: 'Success!',
          text: 'Se ha registrado una salida',
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
    <>
      <FormLayout titulo='Registro Salida'>
        <form onSubmit={formik.handleSubmit}>
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
            <div className='alert alert-danger'>{formik.errors.fecha}</div>
          ) : null}
          <label>Usuario</label>
          <select
            label='Usuario'
            name='usuarioSalida'
            className='form-control my-4 py-2'
            value={formik.values.usuarioSalida}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {usuarios.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.nombre +
                  ' ' +
                  usuario.apellidoPaterno +
                  ' ' +
                  usuario.apellidoMaterno}
              </option>
            ))}
          </select>
          {formik.touched.usuarioSalida && formik.errors.usuarioSalida ? (
            <div className='alert alert-danger'>
              {formik.errors.usuarioSalida}
            </div>
          ) : null}

          <label>Area</label>
          <select
            label='Area'
            name='area'
            className='form-control my-4 py-2'
            value={formik.values.area}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {areas.map((area) => (
              <option key={area.idArea} value={area.idArea}>
                {area.nombreArea}
              </option>
            ))}
          </select>
          {formik.touched.area && formik.errors.area ? (
            <div className='alert alert-danger'>{formik.errors.area}</div>
          ) : null}
          <div className='text-center my-5'>
            <button className='btn btn-primary btn-lg' type='submit'>
              Registrar
            </button>
          </div>
        </form>
      </FormLayout>
    </>
  );
};
