const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventsController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

router.get('/obtener_eventos', validarJWT, getEventos);
router.post('/crear_evento',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    validarJWT, 
    crearEvento);
router.put('/actualizar_evento/:id', validarJWT, actualizarEvento);
router.delete('/eliminar_evento/:id', validarJWT, eliminarEvento);

module.exports = router;