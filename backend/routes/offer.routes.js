const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offer.controller')


const sendMail = async (req, res)=> {
   await offerController.sendMail(req, res).then(offerResponse=>{
        res.send(offerResponse)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

router.post('/', sendMail);

module.exports = router;