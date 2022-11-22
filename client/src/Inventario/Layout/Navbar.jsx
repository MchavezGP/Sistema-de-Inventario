import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand'>Sistema de Inventario</a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Categoria
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <RouterLink to='/categoria' className='dropdown-item'>
                    Categoria
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to='/categorialist' className='dropdown-item'>
                    Lista
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Producto
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <RouterLink to='/' className='dropdown-item'>
                    Registro
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to='/list' className='dropdown-item'>
                    Lista
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Marca
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <RouterLink to='/marca' className='dropdown-item'>
                    Registro
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to='/marcalist' className='dropdown-item'>
                    Lista
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Area
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <RouterLink to='/area' className='dropdown-item'>
                    Registro
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to='/arealist' className='dropdown-item'>
                    Lista
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Entrada
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <RouterLink to='/entradaregistro' className='dropdown-item'>
                    Registro Entrada
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to='/entradaproductoregistro'
                    className='dropdown-item'
                  >
                    Agregar Producto Entrada
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to='/entradalist' className='dropdown-item'>
                    Lista Entrada
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to='/entradaproductolist'
                    className='dropdown-item'
                  >
                    Lista Entrada Producto
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Salida
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <RouterLink to='/salida' className='dropdown-item'>
                    Registro Salida
                  </RouterLink>
                </li>

                <li>
                  <RouterLink
                    to='/productosalidaregistro'
                    className='dropdown-item'
                  >
                    Registro Producto Salida
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to='/salidalist' className='dropdown-item'>
                    Lista Salida
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to='/productosalidalist'
                    className='dropdown-item'
                  >
                    Lista Producto Salida
                  </RouterLink>
                </li>
              </ul>
            </li>

            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Usuario
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <RouterLink to='/login' className='dropdown-item'>
                    Iniciar Sesion
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to='/registro' className='dropdown-item'>
                    Registro
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to='/usuariolist' className='dropdown-item'>
                    Lista Usuario
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
