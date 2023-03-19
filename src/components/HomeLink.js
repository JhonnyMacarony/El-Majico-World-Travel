import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./Components.module.css"

const HomeLink = () => {
  return (
    <Box sx={{fontSize:"22px", width:"100px", height:"100px", paddingLeft:"100px",paddingTop:"50px"}}>
        <Button > <Link style={{textDecoration:"none"}} to="/"> <div className={classes.home} /> </Link> </Button>
    </Box>    

  )
}

export default HomeLink