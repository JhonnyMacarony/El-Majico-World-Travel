const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinations.controller')


const getAll = async (req, res)=> {
   await destinationsController.getAll().then(destinations=>{
        res.send(destinations)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const getUserById = async (req, res) => {
    await destinationsController.getById(req,res).then(destination=>{
        res.send(destination)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const create = async (req, res) => {
    await destinationsController.createUser (req, res).then(destinations=>{
        res.send(destinations);
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const update = async (req, res) =>{
    await destinationsController.updateUser(req, res).then(destination=>{
        res.send(destination);
    })
    .catch(err=>{
        res.status(400).send(err)
    })

}

const remove = async (req, res)=>{
    await destinationsController.deleteUser(req, res).then((response)=>{
        res.send(response)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

router.get('/', getAll);
router.get('/:id', getUserById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:_id', remove);

module.exports = router;