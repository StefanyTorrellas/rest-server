
const { Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria,
        borrarCategoria  } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();


/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias- publico
 router.get('/', obtenerCategorias);

//Obtener una categorias por id- publico
router.get('/:id',[
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
] , obtenerCategoria); 
 
//Crear categorias - privado - cualquier persona con un token válido( hacer midellware y validaciones )
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearCategoria );


//Actualizar  - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').isMongoId(),
    check('id').custom( existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

 //Borrar una categoria -Admin
 router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID  de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId),
    validarCampos,
], borrarCategoria);


module.exports = router;