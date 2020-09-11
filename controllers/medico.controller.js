const { response } = require('express');
const Medico = require('../models/medico.model');

const getMedico = async (req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    return res.json({
        ok: true,
        medicos
    })

}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({usuario: uid , ...req.body});    

    try {
        
        const medicoFromDb = await medico.save();

        return res.json({
            ok: true,
            medico: medicoFromDb
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

const actualizarMedico = (req, res = response) => {

    return res.json({
        ok: true,
        msg: 'Data'
    })

}

const borrarMedico = (req, res = response) => {

    return res.json({
        ok: true,
        msg: 'Data'
    })

}

module.exports = {
    getMedico, crearMedico, actualizarMedico, borrarMedico
}