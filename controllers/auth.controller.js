const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;


    try {
        
        const usuarioDB = await Usuario.findOne({email});
        
        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'Email o password no valida.'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Email o password no valida..'
            });
        }

        const token = await generarJWT(usuarioDB.id);

        return res.json({
            ok:true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con su administrador'
        });
    }
}

module.exports = {
    login
}