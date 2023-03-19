const express = require('express');
const router = express.Router();
const offersController = require('../controllers/offers.controller')


const getAll = async (req, res)=> {
   await offersController.getAll().then(offers=>{
        res.send(offers)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const getOfferById = async (req, res) => {
    await offersController.getById(req,res).then(offer=>{
        res.send(offer)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const create = async (req, res) => {
    await offersController.createOffer (req, res).then(offers=>{
        res.send(offers);
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const update = async (req, res) =>{
    await offersController.updateOffer(req, res).then(offer=>{
        res.send(offer);
    })
    .catch(err=>{
        res.status(400).send(err)
    })

}

const remove = async (req, res)=>{
    await offersController.deleteOffer(req, res).then((response)=>{
        res.send(response)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

router.get('/', getAll);
router.get('/:id', getOfferById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:_id', remove);

module.exports = router;