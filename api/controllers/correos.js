//importar librerias
const nodemailer = require('nodemailer');

//Metodo que crea y configura el protocolo de transporte de correos
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Metodo que envia el correo
 * @param {*} correo 
 */
let enviarCorreo = correo => {
    //Se configura el emisor, el receptor y el mensaje a enviar en el correo
    let mailOptions = {
        from: 'gestionpropuestas5@gmail.com',
        to: correo,
        subject: 'Evaluacion de su propuesta',
        text: 'Su propuesta ya fue calificada, puede hacer la revision en la pagina de propuestas'
    };

    //Envia el correo con la configuracion anteriormente hecha
    transporter.sendMail(mailOptions,(err,data) => {
        if(err){
            console.log("Ha ocurrido un error");
        }else{
            console.log("Correo enviado correctamente")
        }
    });
}

module.exports = {enviarCorreo}