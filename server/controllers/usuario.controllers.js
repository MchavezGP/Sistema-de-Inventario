import { Router } from 'express';
import { pool } from '../db.js';
export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM usuario');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM usuario WHERE idUsuario = ?',
      [req.params.id]
    );
    if (result.length == 0)
      return res.status(404).json({ messagge: 'Usuario no encontrado' });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {

  try {
    const { nombre, apellidoPaterno, apellidoMaterno, correo, contrasena } =
      req.body;
    // const passwordHash = await encrypt(contrasena);
    const [result] = await pool.query(
      'INSERT INTO usuario(nombre, apellidoPaterno, apellidoMaterno, correo, contrasena) VALUES (?,?,?,?,?)',
      [nombre, apellidoPaterno, apellidoMaterno, correo, contrasena]
    );

    res.json({
      idUsuario: result.insertId,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasena,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE usuario SET ? WHERE idUsuario = ?',
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM usuario WHERE idUsuario = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
