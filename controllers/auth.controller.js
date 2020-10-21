const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');
const { googleVerify } = require('../helper/google-verify');

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

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {
        
        const { name, email, picture } = await googleVerify(googleToken)

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google:true
            }); 
        } else {

            usuario =  usuarioDB;
            usuario.google = true;
        }

        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg: 'Token no correcto',
            googleToken
        });

    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    var token = await generarJWT(uid);

    res.json({
        ok:true,
        token
    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}