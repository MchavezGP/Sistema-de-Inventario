import { Router } from 'express';
import { pool } from '../db.js';


//Crea un ProductoSalida
export const createProductoSalida = async (req, res) => {
  try {
    const { producto, salida, cantidad  } = req.body;
    const [result] = await pool.query(
      'INSERT INTO producto_salida (producto, salida, cantidad) VALUES (?,?,?)',
      [producto, salida, cantidad]

    );
    res.json({
      producto,
      salida,
      cantidad
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtiene  ProductosSalidas
export const getProductosSalidas = async (req, res) => {
  try {
    const [result] = await pool.query(' select  ps.idProductoSalida, ps.producto,  ps.salida, p.nombreProducto, ps.cantidad, a.nombreArea,  date_format(s.fecha , "%d-%m-%Y") AS fecha, c.nombreCategoria, m.nombreMarca, u.nombre from producto_salida ps INNER JOIN Producto p ON ps.producto = p.idProducto INNER JOIN marca m ON p.marca = m.idMarca INNER JOIN categoria c ON p.categoria = c.idCategoria INNER JOIN salida s ON ps.salida = s.idSalida INNER JOIN usuario u ON s.usuarioSalida = u.idUsuario INNER JOIN area a ON s.area = a.idArea order by idProductoSalida');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina un ProductoSalida por id
export const deleteProductoSalida= async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM producto_salida WHERE idProductoSalida = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Salida no encontrada' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

