const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});


let enviarCorreo = correo => {
    let mailOptions = {
        from: 'gestionpropuestas5@gmail.com',
        to: correo,
        subject: 'Evaluacion de su propuesta',
        text: 'Su propuesta ya fue calificada, puede hacer la revision en la pagina de propuestas'
    };

    transporter.sendMail(mailOptions,(err,data) => {
        if(err){
            console.log("Ha ocurrido un error");
        }else{
            console.log("Correo enviado correctamente")
        }
    });
}

module.exports = {enviarCorreo}