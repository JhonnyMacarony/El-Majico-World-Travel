const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;



let dbName="elmajico"
let connectionString = `mongodb://localhost:27017/${dbName}`;
let collection = 'users'


mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
  }
)

let usersController = {}


usersController.getAll = async (req, res) =>{
    let data = await db.collection(collection).find().toArray()
    return data;
}

usersController.getById = async (req, res) => {
  console.log(req.params.id);
    let id = ObjectID(req.params.id);
    let data = await db.collection(collection).findOne({_id:id});
    return data;
}

usersController.createUser = async (req, res) =>{
  console.log(req.email)
  let user = {
    name: req.body.name,
    phone: req.body.phone,
    code: req.body.code,
    bDate: req.body.bDate,
    email: req.body.email,
    image: req.body.image,
        }
   let data = await db.collection(collection).insertOne( user )
   if(data){
    let users = await db.collection(collection).find().toArray()
    return users;
   }
}

usersController.updateUser = async (req, res)=>{
  let id =  ObjectID(req.params.id)
  let response = await db.collection(collection).updateOne({_id: id}, {$set:{
    name: req.body.name,
    phone: req.body.phone,
    code: req.body.code,
    bDate: req.body.bDate,
    email: req.body.email,
    image: req.body.image,
  }})

  if(response){
    let data = await db.collection(collection).findOne({_id:id});
    return data;
  };
}

usersController.deleteUser = async (req, res)=>{
    let response = await db.collection(collection).deleteOne({"_id": ObjectID(req.params._id)})
    .then((data)=>{
      if(data){
       return ({deleted:true})
      }
    })
    if(response){
      return response
    }

}

module.exports = usersController;
