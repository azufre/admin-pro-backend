const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medico.controller');

const router = Router();

router.get('/', getMedico);

router.post('/', [
    validarJWT,
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('hospital', 'Hospital id debe de ser valido').isMongoId(),
    validarCampos
] , crearMedico);

router.put('/:id',[
    validarJWT,
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('hospital', 'Hospital id debe de ser valido').isMongoId(),
    validarCampos
], actualizarMedico);

router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;