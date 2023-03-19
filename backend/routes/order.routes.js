const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller')


const sendMail = async (req, res)=> {
   await orderController.sendMail(req, res).then(orderResponse=>{
        res.send(orderResponse)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

router.post('/', sendMail);

module.exports = router;