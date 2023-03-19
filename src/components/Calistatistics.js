import { Box } from '@mui/material'
import React from 'react'
import classes from "./Components.module.css"

const Calistatistics = () => {
  return (
    <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", margin:"30px", width:"90%", paddingLeft:"90px"}}>

      <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"center", width:"100%"}}>
        <p style={{fontSize:"36px", marginRight:"10px"}}>Safe transport</p>
        <div className={classes.checkmark} />
      </Box>

      <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"center", width:"100%"}}>
        <p style={{fontSize:"36px", marginRight:"10px"}}>High quality and fun experience</p>
        <div className={classes.checkmark} />
      </Box>

      <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"center", width:"100%"}}>
        <p style={{fontSize:"36px", marginRight:"10px"}}>Superior services</p>
        <div className={classes.checkmark} />
      </Box>

    </Box>
  )
}

export default Calistatistics