const { response, json } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helper/actualizar-imagen");
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res = response) => {

    const { tipo, id} = req.params;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            'ok':false,
            'msg':'No es un tipo valido'
        });
    }

    if(!req.files || Object.keys(req.files).length == 0){
        return res.status(400).json({
            'ok':false,
            'msg':'No hay ningun archivo'
        });
    }

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if(!extencionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            'ok':false,
            'msg':'No es una extencion permitida'
        });
    }    

    const nombreArchivo =  `${uuidv4()}.${extensionArchivo}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg: 'Error al mover la imagen.'
            });
        }

        actualizarImagen(tipo, id, nombreArchivo);

        return res.json({
            ok: true,
            msg: 'Archivo subido.',
            nombreArchivo
        });
      
    });

}

const retornarImagen = (req, res = response) => {
    
    const { tipo, foto} = req.params;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if(!fs.existsSync(pathImg)){
        return res.sendFile(path.join(__dirname, `../uploads/default/image_not_available.png`));
    }

    return res.sendFile(pathImg)

}  

module.exports = {
    fileUpload, retornarImagen
}