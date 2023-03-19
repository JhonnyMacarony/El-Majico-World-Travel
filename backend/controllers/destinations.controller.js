const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;



let dbName="elmajico"
let connectionString = `mongodb://localhost:27017/${dbName}`;
let collection = 'destinations'


mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
  }
)

let destinationsController = {}


destinationsController.getAll = async (req, res) =>{
    let data = await db.collection(collection).find().toArray()
    return data;
}

destinationsController.getById = async (req, res) => {
  console.log(req.params.id);
    let id = ObjectID(req.params.id);
    let data = await db.collection(collection).findOne({_id:id});
    return data;
}

destinationsController.createUser = async (req, res) =>{
  console.log(req.email)
  let destination = {
    name: req.body.name,
    country: req.body.country,
    ytid: req.body.ytid,
    description: req.body.description,
    duration: req.body.duration,
    include: req.body.include,
    include2: req.body.include2,
    include3: req.body.include3,
    include4: req.body.include4,
    exclude: req.body.exclude,
    exclude2: req.body.exclude2,
    rating: req.body.rating,
    price: req.body.price,
    cprice: req.body.cprice,
    image: req.body.image,
        }
   let data = await db.collection(collection).insertOne( destination )
   if(data){
    let destinations = await db.collection(collection).find().toArray()
    return destinations;
   }
}

destinationsController.updateUser = async (req, res)=>{
  let id =  ObjectID(req.params.id)
  let response = await db.collection(collection).updateOne({_id: id}, {$set:{
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    ytid: req.body.ytid,
    duration: req.body.duration,
    include: req.body.include,
    include2: req.body.include2,
    include3: req.body.include3,
    include4: req.body.include4,
    exclude: req.body.exclude,
    exclude2: req.body.exclude2,
    rating: req.body.rating,
    price: req.body.price,
    cprice: req.body.cprice,
    image: req.body.image,
      }})

  if(response){
    let data = await db.collection(collection).findOne({_id:id});
    return data;
  };
}

destinationsController.deleteUser = async (req, res)=>{
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

module.exports = destinationsController;
