import { Router } from 'express';
import { pool } from '../db.js';


// Crea categoria

export const createCategoria= async (req, res) => {
  try {
    const { nombreCategoria  } = req.body;
    const [result] = await pool.query(
      'INSERT INTO categoria(nombreCategoria) VALUES (?)',
      [nombreCategoria]
    );

    res.json({
      idCategoria: result.insertId,
      nombreCategoria,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtiene todas las categorias

export const getCategorias= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM categoria');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getCategoria = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM categoria WHERE idCategoria = ? ',
      [req.params.id]
    );
    if (result.length == 0)
      return res.status(404).json({ messagge: 'Categoria no encontrado' });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//Elimina una categoria  por id
export const deleteCategoria = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM categoria WHERE idCategoria = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Categoria no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE categoria SET ? WHERE idCategoria = ?',
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

