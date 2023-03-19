import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import classes from "./HomePage.module.css"
import HomeLink from '../components/HomeLink';
import { Link } from 'react-router-dom';

const ContactUsPage = () => {
  const [data, setData] = useState({})

  const handleMail = async(e)=>{
    e.preventDefault()
    const {name, email, message} = e.target.elements
    const response = await axios.post("http://localhost:4000/api/send-mail", {
      name:name.value,
      email:email.value,
      message:message.value
    })
    if(response.data!==""){
      setData(response.data)
    }
  }

  return (
    <Box sx={{display:"grid", gridTemplateRows:"100px 1fr"}}>

      <Box>
        <Box className={classes.widthmod} sx={{display:"grid", gridTemplateColumns:"1fr 1fr", padding:"20px",  width:"97.%", height:"100px", backgroundColor:"rgba(202, 202, 202, 0.714)", color:"black"}}>
          <Box sx={{marginTop:"-30px"}}>
            <HomeLink />
          </Box>
          <Box sx={{display:"flex", flexDirection:"rows", justifyContent:"space-around", marginLeft:"-820px", marginTop:"30px"}}>
              <Link style={{textDecoration: 'none', color:"black", fontSize:"24px"}} to={"/hot-offers"}> Hot Offers </Link>
              <Link style={{textDecoration: 'none', color:"black", fontSize:"24px"}} to={"/contact-us"}> Contact Us </Link>
          </Box>
    </Box>

      </Box>

      <Box sx={{padding:"65px"}}>
        <h1 style={{fontSize:"44px",}}>How can you contact us?</h1>

        <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr", padding:"10px"}}>

          <Box sx={{padding:"20px"}}>
            <h1 style={{ fontWeight:"normal", fontSize:"40px"}}>Send us a message :</h1>
              <Box sx={{display:"flex", flexDirection:"column", gap:"24px", width:"600px", marginTop:"50px"}} component="form" onSubmit={handleMail} > 
                <TextField label="Name" name="name" ></TextField> 
                <TextField label="Email address" name="email" ></TextField> 
                <TextField label="The message" name="message" multiline rows={3} ></TextField> 
                <Button type='submit' variant="contained">Send it</Button> 
              </Box>
          </Box>
          <Box sx={{padding:"20px", marginLeft:"50px", backgroundColor:"rgba(0, 0, 0, 0.962)", color:"white", width:"800px", borderRadius:"4px 150px 4px 150px", padding:"60px"}}>
            <h1 style={{ fontWeight:"normal", fontSize:"40px"}}>Other ways:</h1>
            <Box>
              <p>Phone Number: +0753 807 109</p>
              <p>Email address: elmajico.worldtravel@gmail.com</p>
              <p>Instagram: elmajico.worldtravel</p>
              <p>Facebook: elmajico.worldtravelPage</p>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

export default ContactUsPage