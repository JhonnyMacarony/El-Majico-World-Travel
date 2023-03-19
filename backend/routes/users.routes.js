const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')


const getAll = async (req, res)=> {
   await usersController.getAll().then(users=>{
        res.send(users)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const getUserById = async (req, res) => {
    await usersController.getById(req,res).then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const create = async (req, res) => {
    await usersController.createUser (req, res).then(users=>{
        res.send(users);
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

const update = async (req, res) =>{
    await usersController.updateUser(req, res).then(user=>{
        res.send(user);
    })
    .catch(err=>{
        res.status(400).send(err)
    })

}

const remove = async (req, res)=>{
    await usersController.deleteUser(req, res).then((response)=>{
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