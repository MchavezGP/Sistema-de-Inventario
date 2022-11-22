import { Router } from 'express';
import { pool } from '../db.js';

//Crea una EntradaProducto
export const createEntradaProducto = async (req, res) => {
  try {
    const { producto, entrada ,cantidad  } = req.body;
    const [result] = await pool.query(
      'INSERT INTO ENTRADA_PRODUCTO (producto, entrada, cantidad) VALUES (?,?,?)',
      [producto, entrada, cantidad]

    );

    res.json({
      producto,entrada,cantidad
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtiene EntradasProductos
export const getEntradasProductos= async (req, res) => {
  try {
    const [result] = await pool.query(' select  ep.idEntradaProducto,ep.producto,  ep.entrada, p.nombreProducto, ep.cantidad,  date_format(e.fecha , "%d-%m-%Y") AS fecha, c.nombreCategoria, m.nombreMarca, u.nombre from entrada_producto ep INNER JOIN Producto p ON ep.producto = p.idProducto INNER JOIN Marca m ON p.marca = m.idMarca INNER JOIN Categoria c ON p.categoria = c.idCategoria INNER JOIN Entrada e ON ep.entrada = e.idEntrada INNER JOIN Usuario u ON e.usuarioEntrada = u.idUsuario order by idEntradaProducto; ');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina EntradaProducto
export const deleteEntradaProducto = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM ENTRADA_PRODUCTO WHERE idEntradaProducto = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Entrada no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


