module.exports.sendMail = (mailInfo) => {
    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    const msg = {
        to: mailInfo.receiverMail,
        from: mailInfo.senderMail,
        subject: mailInfo.subject,
        text: 'Here is your password reset link',
        html: mailInfo.content,
    };
    sgMail.send(msg);
}
