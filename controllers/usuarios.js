const { respose, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = respose) => {
    // const { q, nombre= 'No name', apikey, page  = 1, limit}= req.query;
    const { limite = 5, desde = 0 } = req.query;   //Estos son los argumentos opcionales que vienen por el query
    const query = { estado: true}    //aca hago el query para extraer solo los de estado true
    // const usuarios = await Usuario.find( query )
    // .skip(Number( desde ))
    // .limit(Number( limite ));
    // const total = await Usuario.countDocuments( query );
    
    const [total, usuarios] = await Promise.all([      
        Usuario.countDocuments(query),
        Usuario.find(query)                 //los mandamos aca
        .skip(Number( desde ))
        .limit(Number( limite ))
    ]);

    res.json({
        total,                          //y los imprimimos en la respuesta
        usuarios
    });
};

const usuariosPost = async ( req, res = respose) => {
    
    //para extraer todo seria {goole, ...resto}
    const {nombre, email, password, rol} = req.body;
    const usuario = new Usuario( {nombre, email, password, rol} );
    
   

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
         usuario
    });
};

const usuariosPut = async(req, res = respose) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto} = req.body;

    if ( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
};

const usuariosPatch=(req, res= respose) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
};

const usuariosDelete = async (req, res= respose) => {

    const { id } = req.params;

    // //Borrado Fisicamente
    // const usuario = await Usuario.findOneAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false});

    res.json(usuario);
};




module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}