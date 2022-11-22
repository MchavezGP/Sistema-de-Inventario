import { Router } from 'express';

import {
       
        deleteUsuario,
        updateUsuario,
        createUsuario,
        getUsuario,
        getUsuarios
} from '../controllers/usuario.controllers.js'

const router = Router();

router.get('/usuario', getUsuarios);

router.get('/usuario/:id', getUsuario);

router.post('/usuario', createUsuario);

router.put('/usuario/:id', updateUsuario);

router.delete('/usuario/:id', deleteUsuario);

export default router;