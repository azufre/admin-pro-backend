const { response } = require('express');
const Hospital = require('../models/hospital.model');

const getHospital = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    return res.json({
        ok: true,
        hospitales
    })

}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({usuario: uid , ...req.body});    

    try {
        
        const hospitalFromDb = await hospital.save();

        return res.json({
            ok: true,
            hospital: hospitalFromDb
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

const actualizarHospital = (req, res = response) => {

    return res.json({
        ok: true,
        msg: 'getHospitales'
    })

}

const borrarHospital = (req, res = response) => {

    return res.json({
        ok: true,
        msg: 'getHospitales'
    })

}

module.exports = {
    getHospital, crearHospital, actualizarHospital, borrarHospital
}