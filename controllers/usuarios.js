const { respose, request } = require('express');




const usuariosGet = (req = request, res = respose) => {
    const { q, nombre= 'No name', apikey, page  = 1, limit}= req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const usuariosPost=(req, res = respose) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        nombre,
        edad
    });
};

const usuariosPut= (req, res = respose) => {
    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
};

const usuariosPatch=(req, res= respose) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
};

const usuariosDelete= (req, res= respose) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
};




module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}