const { response } = require("express");
const { body } = require("express-validator");
const { Producto } = require("../models");



//Crear Productos
const crearProducto= async( req, res = response )=> {

    const { estado, usuario, ...body }= req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre }); //aca pregunto si existe una categoria con ese nombre 

    if( productoDB){ // si el producto existe entonces mando un error diciendo que el producto ya existe
        return res.status(400).json({
            msg: `El Producto ${ productoDB.nombre }, ya existe`
        });
    }
    
//Generar la data a guardar
    const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id
}
    const producto = new Producto( data ); //Se crea un nuevo producto usando mi modelo 

//Guardar DB

    await producto.save();  //SE GRABA 
    res.status(201).json(producto);

}   
 

//obtenerProducto -paginado- total- populate
const obtenerProductos= async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query; 
    const query = { estado: true}  

    const [total, productos] = await Promise.all([      
        Producto.countDocuments(query),
        Producto.find(query)   
        .populate('usuario', 'nombre') 
        .populate('categoria', 'nombre') 
        .skip(Number( desde ))
        .limit(Number( limite ))
    ]);

    res.json({
        total,                          //y los imprimimos en la respuesta
        productos
    });
};
//obtenerProducto -populate {} 
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');
                        
    res.json( producto);   

} 

//actualizarProducto
const actualizarProducto =async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    if( data.nombre){
         data.nombre  = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true});
    res.json(producto);
}

//borrarProducto -estado:false
const borrarProducto = async (req, res= response) => {
    const { id } = req.params;
     
    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false},{new: true});

    res.json( productoBorrado );
};

module.exports ={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto



    

}