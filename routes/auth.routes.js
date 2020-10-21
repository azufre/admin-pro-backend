const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login', [
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Password es requerido').not().isEmpty(),
    validarCampos
] ,login);

router.post('/login/google', [
    check('token', 'Token de google es requerido').not().isEmpty(),
    validarCampos
] ,googleSignIn);

router.get('/renew', [
    validarJWT,
] ,renewToken);


module.exports = router;