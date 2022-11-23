import { Router } from 'express';
import { pool } from '../db.js';

//Crea Entradas
export const getEntradas = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT e.idEntrada, date_format(e.fecha , "%d-%m-%Y") AS fecha ,   u.nombre FROM entrada e  INNER JOIN usuario u ON e.usuarioEntrada = u.idUsuario order by idEntrada');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtiene una Entrada
export const getEntrada = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM entrada WHERE idEntrada = ?',
      [req.params.id]
    );
    if (result.length == 0)
      return res.status(404).json({ messagge: 'Entrada no encontrado' });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crea una Entrada 
export const createEntrada = async (req, res) => {
  try {
    const { fecha,  usuarioEntrada } = req.body;
    const [result] = await pool.query(
      'INSERT INTO entrada (fecha , usuarioEntrada ) VALUES (?,?)',
      [fecha,  usuarioEntrada ]
    );

    res.json({
      idEntrada: result.insertId,
      fecha,
      usuarioEntrada,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualiza un atributo de una Entrada
export const updateEntrada = async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE entrada SET ? WHERE idEntrada = ?',
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina una Entrada
export const deleteEntrada = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM entrada WHERE idEntrada = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Entrada no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
