import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import classes from "./Components.module.css"


const EndBar = () => {
  return (
    <Box className={classes.mod2} sx={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
        <a href="ht" style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginRight:"150px", marginLeft:"50px"}}>
            <div className={classes.insta} />
            <p className={classes.linkmod} style={{ textDecoration:"underline white", color:"black", marginLeft:"-50px"}}>El_Majico_World_Travel</p>
        </a>
        <a href="https://www.youtube.com/channel/UCnGWZBIbF_2yB0vJntym3zQ/" style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginRight:"150px", marginLeft:"50px"}}>
            <div className={classes.yt} />
            <p className={classes.linkmod} style={{textDecoration:"underline white", color:"black", marginLeft:"-50px"}}>El_Majico_World_Travel</p>
        </a>
        <a href="https://www.facebook.com/profile.php?id=100089280677279&mibextid=ZbWKwL" style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginRight:"150px", marginLeft:"50px"}}>
            <div className={classes.fb} />
            <p className={classes.linkmod} style={{ textDecoration:"underline white", color:"black", marginLeft:"-50px"}}>El_Majico_World_Travel_Page</p>
        </a>
        <a href="https://www.tiktok.com/@elmajico_world_travel/" style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginRight:"150px", marginLeft:"50px"}}>
            <div className={classes.tt} />
            <p className={classes.linkmod} style={{textDecoration:"underline white", color:"black", marginLeft:"-50px"}}>El_Majico_World_Travel_</p>
        </a>
        <Link style={{color:"rgba(192, 192, 192, 0.39)"}} to="/admin-security" >‎ </Link>
    </Box>
  )
}

export default EndBar