import { Router } from 'express';
import { pool } from '../db.js';

// Crea Marca
export const createMarca = async (req, res) => {
  try {
    const { nombreMarca } = req.body;
    const [result] = await pool.query(
      'INSERT INTO marca(nombreMarca) VALUES (?)',
      [nombreMarca]
    );

    res.json({
      idMarca: result.insertId,
      nombreMarca,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtiene todas las Marcas
export const getarcas = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM marca');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getMarca = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM marca  WHERE idMarca = ? ',
      [req.params.id]
    );
    if (result.length == 0)
      return res.status(404).json({ messagge: 'Marca no encontrado' });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Elimina una Marca
export const deleteMarca = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM marca WHERE idMarca = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Marca no encontrada' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateMarca = async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE marca SET ? WHERE idMarca = ?',
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



