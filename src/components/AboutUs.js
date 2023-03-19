import { Box } from '@mui/system'
import React from 'react'
import classes from "./Components.module.css"

const AboutUs = () => {
  return (
    <Box sx={{display:"flex", flexDirection:"columns", justifyContent:"space-between", alignItems:"center"}}>
        <div className={classes.logo} />
        <Box sx={{marginLeft:"200px", width:"450px"}}>
            <h1 style={{fontSize:"47px"}}>About us</h1>
            <p style={{fontSize:"25px"}}> Our name is El Majico World Travel, we are an international travel company and we make sure that your vacation is successful.</p>
        </Box>
    </Box>
  )
}

export default AboutUs