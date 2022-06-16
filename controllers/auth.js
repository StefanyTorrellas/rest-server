const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res= response) => {

    const { email, password} = req.body;

    try {

        //Verificar si el Email existe
        const usuario = await Usuario.findOne({ email });
            if(!usuario){
                return res.status(400).json({
                    msg: 'usuario / Password no son correctos- correo'
                });
        }

        //Verificar si el usuario esta activo en db
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'usuario / Password no son correctos- estado:false'
            });
    }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'usuario / Password no son correctos- password'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario. id);

        res.json({
            usuario,
            token
        
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
   

}




module.exports = {
    login
}