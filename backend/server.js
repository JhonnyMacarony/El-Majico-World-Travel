const http = require("http")
const rootpath = require("rootpath")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const uploadRouter = require("./routes/upload.routes")

rootpath();

let app = express()

app.server = http.createServer(app)
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/upload-service", uploadRouter)
app.use("/external-images", express.static(__dirname + "/images"))

app.use('/api/users', require('./routes/users.routes'));
app.use('/api/destinations', require('./routes/destinations.routes'));
app.use('/api/offers', require('./routes/offers.routes'));

app.use('/api/send-mail', require('./routes/mail.routes'));

app.use('/api/send-order', require('./routes/order.routes'));
app.use('/api/send-offer', require('./routes/offer.routes'));

app.server.listen(process.env.DATA_SERVER_PORT, () =>{
    console.log(`Started on port ${app.server.address().port}`)
})