import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';
import { Box } from '@mui/system';
import { Button, Dialog,  DialogContent, DialogTitle, Rating, TextField } from '@mui/material';
import classes from "./HomePage.module.css"
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const PurchaseMailPage = () => {
    const [ destination, setPageData ] = useState({name:"", price:"", image:"", rating:"", description:"", include:"", include2:"", include3:"", include4:"", exclude:"", exclude2:"", cprice:"", ytid:""})

    const params = useParams()
    
    useEffect(()=>{
        const destinationRequest = async ()=>{
            const response = await axios.get(`http://localhost:4000/api/destinations/${params.id}`)
        setPageData(prevData=>({...prevData, ...response.data}))
        } 
        destinationRequest()
    },[params.id])
    
    useEffect(()=>{
        console.log(destination)
    },[destination])


    const [ open, setOpen ] = useState(false)
    const [ final, setFinal ] = useState(false)

    const [data, setData] = useState({})

    const handleMail = async(e)=>{
    e.preventDefault()
    const {name, email, message, age, phone, children, adult, destination} = e.target.elements
    const response = await axios.post("http://localhost:4000/api/send-order", {
        name:name.value,
        age:age.value,
        phone:phone.value,
        children:children.value,
        adult:adult.value,
        destination:destination.value,
        email:email.value,
        message:message.value
    })
    if(response.data!==""){
        setData(response.data)
    }
    }

    const handlePurchase = ()=>{
        setOpen(true)
    }

    const handleClose = ()=>{
        setOpen(false)
        setFinal(false)
    }

    const handleSend = ()=>{
        setOpen(false)
        setFinal(true)
    }

    
  return (

    <Box>
            <Box>
                <Link to={"/search-destination"}> <div className={classes.arrow} /> </Link>
            </Box>
            <Box className={classes.heightmod}  sx={{display:"grid", gridTemplateColumns:"1fr 1fr", color:"white", marginTop:"-50px", height:"91.5vh", width:"700px", marginLeft:"500px", backgroundColor:"rgba(151, 151, 151, 0.656)", padding:"40px"}}>
            <img className={classes.heightmod}  src={destination.image} style={{position:"absolute", zIndex:"-1", height:"100vh", width:"780px", marginTop:"-40px", marginLeft:"-40px"}} />
                <Box sx={{fontSize:"30px", width:"400px", marginLeft:"100px", marginTop:"130px"}}>
                    <p style={{position:"absolute", marginTop:"-80px", fontSize:"46px", marginLeft:"140px"}}>Your order</p>
                    <p style={{fontWeight:"bold"}}>Destination Name :</p>
                    <p style={{fontWeight:"bold"}}>Country Name :</p>
                    <p style={{fontWeight:"bold"}}>Adult Price :</p>
                    <p style={{fontWeight:"bold"}}>Child Price :</p>
                    <p style={{fontWeight:"bold"}}>Duration :</p>
                    <p style={{fontWeight:"bold"}}>Rating :</p>
                </Box>

                <Box sx={{fontSize:"30px", width:"400px", marginTop:"130px"}}>
                    <p style={{fontWeight:"normal"}}>{destination.name}</p>
                    <p style={{fontWeight:"normal"}}>{destination.country}</p>
                    <p style={{fontWeight:"normal"}}>{destination.cprice}</p>
                    <p style={{fontWeight:"normal"}}>{destination.price}</p>
                    <p style={{fontWeight:"normal"}}>{destination.duration}</p>
                    <p style={{fontWeight:"normal"}}>
                        <Rating
                            name="simple-controlled"
                            value={destination.rating}
                            readOnly
                        />
                    </p>
                </Box>
                <Box sx={{paddingLeft:"420px", position:"absolute", marginTop:"600px"}}>
                    <Button sx={{width:"250px", height:"50px", }} variant="contained" color='success' onClick={handlePurchase} >Next</Button>
                </Box>

            </Box>
        <Dialog open={open} fullScreen sx={{width:"650px", marginLeft:"600px", height:"100vh"}}>

            <DialogTitle sx={{marginLeft:"180px", fontSize:"30px", fontWeight:"bold", marginTop:"20px"}}>
                Fill in the fields
                <CloseIcon sx={{position:"absolute", marginLeft:"-390px", cursor:"pointer"}} onClick={handleClose} />
            </DialogTitle>

            <DialogContent>
                <Box sx={{display:"flex", flexDirection:"column", gap:"24px", width:"600px", marginTop:"50px"}} component="form" onSubmit={handleMail} > 
                    <TextField label="Name" name="name" ></TextField> 
                    <TextField label="Email address" name="email" ></TextField> 
                    <TextField label="Phone Number" name="phone" ></TextField> 
                    <TextField type="number" label="Children's Number" name="children" ></TextField> 
                    <TextField type="number" label="Adult's Number" name="adult" ></TextField> 
                    <TextField type="number" label="Your Age" name="age" ></TextField> 
                    <TextField label="Your Destination" name="destination" ></TextField> 
                    <TextField label="Extra details" name="message" multiline rows={3} ></TextField> 
                    <Button style={{width:"120px", height:"36px", marginLeft:"480px", marginTop:"750px", position:"absolute"}} onClick={handleSend} type='submit' variant='contained' endIcon={<SendIcon /> }>Send</Button>
                </Box>
            </DialogContent>
        </Dialog>
        <Dialog open={final}>
            <Box sx={{padding:"30px"}}>
            <CloseIcon sx={{cursor:"pointer"}} onClick={handleClose} />
                <h4>You will receive an email with further instructions after we verify the data you submitted.</h4>
                <p>Have a nice day !</p>
            </Box>
        </Dialog>
    </Box>

  )
}

export default PurchaseMailPage