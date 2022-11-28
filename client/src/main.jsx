import React from 'react';
import ReactDOM from 'react-dom/client';
import { InventarioApp } from './InventarioApp';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './estilos.css'
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <InventarioApp />
  </HashRouter>
);
