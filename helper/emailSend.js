const nodemailer = require('nodemailer'); 
const smtpTransport = require('nodemailer-smtp-transport');
module.exports.sendMail = (mailOptions) => {
    let transporter = nodemailer.createTransport(smtpTransport({

        // service: 'gmail',
        // host: 'smtp.gmail.com',
        // host: 'smtp.gmail.com',
        // port: 578,
        service: 'gmail',
        auth: {
            user: 'afzalahmad578@gmail.com',
            pass: 'afzal@1994'
        },
        tls: {
            rejectUnauthorized: false
        }
    }));
    transporter.sendMail((mailOptions), (err, info) => {
        if (err) {
            console.log(err);
            console.log('Mail not sent');
            return false;
        } else {
            return true
        }
    })
}
