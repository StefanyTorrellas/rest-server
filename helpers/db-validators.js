const Role = require('../models/role');
const {Usuario, Categoria, Producto }= require('../models');


 const esRoleValido = async (rol  = '' ) => {
    const existeRol = await Role.findOne({ rol }) ;
    if ( !existeRol){
        throw new Error(` El rol ${ rol } no está registrado en la BD`)
    }
}
const emailExiste = async ( email = '') =>{
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });
    if( existeEmail){
        throw new Error(` El email ${ email }, ya esta registrado`)

    }
}
const existeUsuarioPorId = async ( id ) =>{

    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario){
        throw new Error(` El id no existe ${ id }`);

    }
}

/**
 * Validadores de Categorias
 * ---------------------------
 */
 const existeCategoriaPorId = async ( id ) =>{
 
     //Verificar si la categoria existe
     const existeCategoria = await Categoria.findById(id);
     if( !existeCategoria ){
        throw new Error(` El id no existe ${ id }`);
 
     }
 }
 
/**
 * Validadores de Productos
 * ---------------------------
 */
 const existeProductoPorId = async ( id ) =>{
 
    //Verificar si la categoria existe
    const existeProducto= await Producto.findById(id);
    if( !existeProducto ){
       throw new Error(` El id no existe ${ id }`);

    }
}
 

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}