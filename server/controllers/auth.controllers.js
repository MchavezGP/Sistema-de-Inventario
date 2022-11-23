import { Router } from 'express';
import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  try {
    const { nombre, apellidoPaterno, apellidoMaterno, correo, contrasena } =
      req.body;
    const encryptedPassword = await bcrypt.hash(contrasena, 10);
    // console.log(encryptedPassword)
    const [result] = await pool.query(
      'INSERT INTO usuario (nombre, apellidoPaterno, apellidoMaterno, correo, contrasena) VALUES (?,?,?,?,?)',
      [nombre, apellidoPaterno, apellidoMaterno, correo, encryptedPassword]
    );

    res.json({
      idUsuario: result.insertId,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasena: encryptedPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const [result] = await pool.query(
      'SELECT * FROM usuario WHERE CORREO = ?',
      [correo]
    );
    if (result.length == 0) {
      return res.status(404).json({ messagge: 'Usuario no encontrado' });
    }
    const user = result[0];
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (validPassword) {
      res.json(result[0]);
    } else {
      return res.status(404).json({ message: 'Contrasena Incorrecta' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
