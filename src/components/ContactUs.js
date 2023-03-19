import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./Components.module.css"

const ContactUs = () => {
  return (
    <Box className={classes.mod1} sx={{display:"flex",flexDirection:"columns", color:"white", alignItems:"center", justifyContent:"center", backgroundColor:"rgba(9, 5, 24, 0.973)", height:"100%", width:"99.2vw"}}>
        <Button className={classes.specmod} sx={{ border:"3px solid white", borderRadius:"16px", width:"350px", height:"110px", padding:"15px"}}> <Link to={"/contact-us"} style={{textDecoration:"none", color:"white", fontSize:"32px"}}>Contact us</Link> </Button>
        <p className={classes.specmod} style={{fontSize:"32px", fontWeight:"bold", color:"white", marginLeft:"50px"}}>Learn more about us</p>
    </Box>
  )
}

export default ContactUs