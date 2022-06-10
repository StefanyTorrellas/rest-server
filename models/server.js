const express = require('express');
const cors= require('cors');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.usuariosGet =  '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }
    middlewares(){
        //CORS
        this.app.use( cors() );


        //Directorio publico
        this.app.use( express.static('public'));

        //Lectura y parseo del body
        this.app.use( express.json() );
    }
    
    routes(){

        this.app.use( this.usuariosPath, require('../routes/usuarios'))


    }
    listen(){
        this.app.listen( this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;