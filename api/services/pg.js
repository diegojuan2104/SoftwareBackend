const{ Pool } = require('pg');

/**
 * Clase para la conexion a la base de datos 
 */
class ServicioPG{

    constructor(){
        this.pool = new Pool({
            user: "dllo_web_udem",
            host: "saurmo.com",
            database: "udem",
            password: "bf5e722cc518fce3c4a57fdb1b6647b0434138370eb1c30f9293ec8e03062b78",
            port: 5432
        });
    }

    /**
     * Metodo que ejecuta la sentencia sql que se le pasa por parametro
     * @param {*} sql 
     */
   async ejecutarSQL(sql){
        let respuesta = await this.pool.query(sql)
        return respuesta;
    }

    async ejecutarSQL(sql,valores){
        let respuesta = await this.pool.query(sql,valores)
        return respuesta;
    }
}

module.exports = ServicioPG;