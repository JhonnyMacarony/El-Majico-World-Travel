const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;



let dbName="elmajico"
let connectionString = `mongodb://localhost:27017/${dbName}`;
let collection = 'offers'


mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
  }
)

let offersController = {}


offersController.getAll = async (req, res) =>{
    let data = await db.collection(collection).find().toArray()
    return data;
}

offersController.getById = async (req, res) => {
  console.log(req.params.id);
    let id = ObjectID(req.params.id);
    let data = await db.collection(collection).findOne({_id:id});
    return data;
}

offersController.createOffer = async (req, res) =>{
  console.log(req.email)
  let offer = {
    name: req.body.name,
    description: req.body.description,
    destinations: req.body.destinations,
    duration: req.body.duration,
    price: req.body.price,
    cprice: req.body.cprice,
    rating: req.body.rating,
    image: req.body.image,
        }
   let data = await db.collection(collection).insertOne( offer )
   if(data){
    let offers = await db.collection(collection).find().toArray()
    return offers;
   }
}

offersController.updateOffer = async (req, res)=>{
  let id =  ObjectID(req.params.id)
  let response = await db.collection(collection).updateOne({_id: id}, {$set:{
    name: req.body.name,
    description: req.body.description,
    destinations: req.body.destinations,
    duration: req.body.duration,
    price: req.body.price,
    cprice: req.body.cprice,
    rating: req.body.rating,
    image: req.body.image,
  }})

  if(response){
    let data = await db.collection(collection).findOne({_id:id});
    return data;
  };
}

offersController.deleteOffer = async (req, res)=>{
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

module.exports = offersController;