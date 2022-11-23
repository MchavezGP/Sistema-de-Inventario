import { Router } from 'express';
import { pool } from '../db.js';

//Crea una area
export const createArea = async (req, res) => {
  try {
    const { nombreArea } = req.body;
    const [result] = await pool.query(
      'INSERT INTO area (nombreArea) VALUES (?)',
      [nombreArea]
    );

    res.json({
      idArea: result.insertId,
      nombreArea,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtiene todas las Areas
export const getAreas = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM area');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Borra un Area por id
export const deleteArea = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM area WHERE idArea = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Area no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


