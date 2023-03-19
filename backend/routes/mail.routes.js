const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mail.controller')


const sendMail = async (req, res)=> {
   await mailController.sendMail(req, res).then(mailResponse=>{
        res.send(mailResponse)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

router.post('/', sendMail);

module.exports = router;