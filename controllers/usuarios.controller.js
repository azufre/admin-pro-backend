const { response, json } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const getUsuarios = async (req, resp) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');
    
    resp.status(200).json({
        ok: true,
        usuarios,
        uid: req.uid
    })
};

const crearUsuario = async (req, resp = response) => {

    const {email, password } = req.body;

    try {
        
        const existeUsuario = await Usuario.findOne({email});

        if(existeUsuario){
            return resp.status(400).json({
                ok: false,
                msg: "El correo ya existe"
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();        
        const token = await generarJWT(usuario.id);
        
        resp.status(200).json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {

        console.log(error);
        resp.status(200).json({
            ok: false,
            msg: "Error inesperado"
        });

    }

};

const actualizarUsuario = async (req, res = response) =>{
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email: email});
            if(existeEmail){
                return res.status(400).json({ok:false, msg: 'ya existe un usuario con ese correo.'});
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new : true});

        return res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado'
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        return res.status(200).json({
            ok:true,
            uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insperado'
        });
    }
}

module.exports = {
    getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario
};