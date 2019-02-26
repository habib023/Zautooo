const nodemailer = require('nodemailer');
module.exports = (app) =>
 {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        //tls: true,
        auth: {
          user: 'habib.aissabenaissa@sesame.com.tn',
          pass: 'Ilovesys' // Enter here password for email account from which you want to send emails
        },
        debug: true
        
      });

      app.post('/send', function (req, res) {

        let senderName = req.body.contactFormName;
        let senderEmail = req.body.contactFormEmail;
        let messageSubject = req.body.contactFormSubjects;
        let messageText = req.body.contactFormMessage;
        let copyToSender = req.body.contactFormCopy;
        let mailOptions = {
          to: ['habib.aissabenaissa@sesame.com.tn'], // Enter here the email address on which you want to send emails from your customers
          from: senderName,
          subject: messageSubject,
          text: messageText,
          replyTo: senderEmail
        };
      
        if (senderName === '') {
          res.status(400);
          res.send({
          message: 'Bad request'
          });
          return;
        }
      
        if (senderEmail === '') {
          res.status(400);
          res.send({
          message: 'Bad request'
          });
          return;
        }
      
        if (messageSubject === '') {
          res.status(400);
          res.send({
          message: 'Bad request'
          });
          return;
        }
      
        if (messageText === '') {
          res.status(400);
          res.send({
          message: 'Bad request'
          });
          return;
        }
      
        if (copyToSender) {
          mailOptions.to.push(senderEmail);
        }
      
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
            res.end('error');
          } else {
            console.log('Message sent: ', response);
            res.end('sent');
          }
        });
      });


}