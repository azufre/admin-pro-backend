const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Password es requerido').not().isEmpty(),
    validarCampos
] ,login);


module.exports = router;