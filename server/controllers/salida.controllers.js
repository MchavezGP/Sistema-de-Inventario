import { Router } from 'express';
import { pool } from '../db.js';

//Obtiene Salidas
export const getSalidas = async (req, res) => {
  try {
    const [result] = await pool.query(
      ' SELECT s.idSalida, date_format(s.fecha , "%d-%m-%Y") AS fecha, a.nombreArea , u.nombre FROM salida s  INNER JOIN usuario u ON s.usuarioSalida = u.idUsuario INNER JOIN area a ON s.area = a.idArea order by idSalida;'
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtiene una Salida
export const getSalida = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM SALIDA WHERE idSalida = ?',
      [req.params.id]
    );
    if (result.length == 0)
      return res.status(404).json({ messagge: 'Salida no encontrado' });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crea una Salida
export const createSalida = async (req, res) => {
  try {
    const { fecha , usuarioSalida,  area } = req.body;
    const [result] = await pool.query(
      'INSERT INTO SALIDA (fecha,  usuarioSalida,  area  ) VALUES (?,?,?)',
      [fecha, usuarioSalida, area]
    );

    res.json({
      idEntrada: result.insertId,
      fecha,
      usuarioSalida,
      area,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualiza un atributo de una Salida
export const updateSalida = async (req, res) => {
  try {
    const result = await pool.query('UPDATE SALIDA SET ? WHERE idSalida = ?', [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina una Salida por id
export const deleteSalida = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM SALIDA WHERE idSalida = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Salida no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
