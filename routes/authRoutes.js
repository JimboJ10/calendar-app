const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const {validarCampos} = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/authController');
const {validarJWT} = require('../middlewares/validar-jwt')

router.post('/registrar_usuario', 
    [ 
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario);
router.post('/login_usuario', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario);
router.get('/revalidar_token', validarJWT, revalidarToken);

module.exports = router;