const { rejects } = require('assert');
const jwt = require('jsonwebtoken');
const { resolve } = require('path');


const generarJWT = ( uid = '' ) => {
    
    return new Promise( (resolve, reject) => {

        const payloand = { uid };
        jwt.sign( payloand, process.env.SECRETORPRIVATEKEY, {   //instrucción para general un jsonwebtoken 
            expiresIn: '125255463216162515315634344'
        },(err,token) => {

            if( err){
                console.log(err);
                reject('No se pudo generar el token')

            } else {
                resolve( token );
            }

        })                      
    })


}





module.exports = {
    generarJWT
}