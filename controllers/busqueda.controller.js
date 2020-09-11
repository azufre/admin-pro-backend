const { response } = require('express');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

const getBusqueda = async (req, res = response) =>{

    const search = req.params.busqueda;
    const expRegx = new RegExp(search, 'i')

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ 'nombre':  expRegx}),
        Hospital.find({ 'nombre':  expRegx}),
        Medico.find({ 'nombre':  expRegx})
    ]);

    return res.json({
        'ok': true,
        usuarios,
        medicos,
        hospitales
    });

}

const getDocumentoColeccion = async (req, res = response) =>{

    const search = req.params.busqueda;
    const tabla = req.params.tabla;
    const expRegx = new RegExp(search, 'i');
    let result = [];

    switch (tabla) {
        case 'medicos':
            result = await Medico.find({ 'nombre':  expRegx});
            break;
        
        case 'hospitales':
            result = await Hospital.find({ 'nombre':  expRegx});
            break;

        case 'usuarios':
            result = await Usuario.find({ 'nombre':  expRegx});
            break;
        default:
            return res.status(400).json({
                'ok': false,
                'msg':'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }

    return res.json({
        'ok': true,
        result
    });

}

module.exports = {
    getBusqueda, getDocumentoColeccion
}