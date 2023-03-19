import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import HomeLink from './HomeLink'
import classes from "./Components.module.css"

const Navbar = () => {
  return (
    <Box className={classes.mod3} sx={{display:"grid", gridTemplateColumns:"1fr 1fr", padding:"20px",  width:"97.%", height:"100px", backgroundColor:"rgba(202, 202, 202, 0.714)", color:"black"}}>
        <Box className={classes.mod3} sx={{marginTop:"-30px"}}>
          <HomeLink />
        </Box>
        <Box className={classes.mod4} sx={{display:"flex", flexDirection:"rows", justifyContent:"space-around", marginLeft:"-820px", marginTop:"30px"}}>
            <Link style={{textDecoration: 'none', color:"black", fontSize:"24px"}} to={"/hot-offers"}> Hot Offers </Link>
            <Link style={{textDecoration: 'none', color:"black", fontSize:"24px"}} to={"/contact-us"}> Contact Us </Link>
        </Box>
    </Box>
)
}

export default Navbar