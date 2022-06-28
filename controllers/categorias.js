const { response } = require("express");
const { Categoria } = require('../models');
// const categoria = require("../models/categoria");


//obtenerCategorias -paginado- total- populate
const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query; 
    const query = { estado: true}  

    const [total, categorias] = await Promise.all([      
        Categoria.countDocuments(query),
        Categoria.find(query)   
        .populate('usuario', 'nombre')              
        .skip(Number( desde ))
        .limit(Number( limite ))
    ]);

    res.json({
        total,                          //y los imprimimos en la respuesta
        categorias
    });
};

//obtenerCategoria -populate {}   //aqui unicamente va a regresar el objeto de la categoria
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById( id )
                               .populate('usuario', 'nombre'); // con u miniscula 'usuario'
    console.log(id);
                        
    res.json( categoria);   

}

const crearCategoria = async(req, res = response ) => {
    //lo primero es extraer el nombre que viene en la reques.body asi:
    const nombre =  req.body.nombre.toUpperCase(); // porque quiero almacenar las categorias en mayusculas

    const categoriaDB = await Categoria.findOne({ nombre }); //aca pregunto si existe una categoria con ese nombre 

    if( categoriaDB){ // si la categoria existe entonces mando un error diciendo que la categoria ya existe
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id  //recordar que el usuario tiene que ser un id de mongoo

    }

    const categoria = new Categoria( data ); //Se crea una nueva categoria usando mi modelo 

    //Guaradar DB
    await categoria.save();  //SE GRABA 

    res.status(201).json(categoria);  // y aca se hace la impresión de la respuesta 
}

//actualizarCategoria
const actualizarCategoria =async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true});
    res.json(categoria);
}

//borrarCategoria -estado:false

const borrarCategoria = async (req, res= response) => {
    const { id } = req.params;
    
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false},{new: true});

    res.json(categoriaBorrada, );
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}