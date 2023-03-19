const express = require("express")
const ImagesController = require("../controllers/images.controller")
const UploadRouter = express.Router()

UploadRouter.post("/api/images/upload", (req, res)=>{
    ImagesController.loadFile(req, res)
})

UploadRouter.post("/api/images/delete", (req,res) =>{
    ImagesController.deleteFile(req,res)
})

module.exports = UploadRouter