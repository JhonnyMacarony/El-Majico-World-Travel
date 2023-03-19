const nodemailer = require('nodemailer');


let mailController = {}

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "ionut.csndrea@gmail.com",
      pass: "dtdwngaqnbegphph",
    },
  });
  


mailController.sendMail = async (req, res) =>{
  console.log(req)
  var message = {
    from: "client@gmail.com",
    to: "elmajico.worldtravel@gmail.com",
    subject: `Mesaj primit de la ${req.body.name}`,
    text: `Email: ${req.body.email}, <br/>Message: ${req.body.message}`,
    html: `<p>Email:<b> ${req.body.email}</b>,</p> <br/><p>Message: <b>${req.body.message}</b></p>`,
  };

  transporter.sendMail(message, (err, result) => {
    if (err){
    console.log(err)
        res.json('Opps error occured')
    } else{
        res.json('thanks for e-mailing me');
    }
})
}

module.exports = mailController;
