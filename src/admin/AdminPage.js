import { Box, Button, Dialog, DialogContent, TextField } from '@mui/material'
import React, { useState } from 'react'
import AdminDestinations from "./AdminDestinations"
import AdminOffers from './AdminOffers'
import AdminUsers from './AdminUsers'
import AdminUsersForm from './AdminUsersForm'
import { Link, Route, Routes } from 'react-router-dom'
import { useNavigate  } from "react-router-dom";
import AdminDestinationsForm from './AdminDestinationsForm'
import AdminOffersForm from './AdminOffersForm'
import classes from "./AdminUsers.module.css"


const AdminPage = () => {
  const [checkCode, setCheckCode] = useState('')
  const [open, setOpen] = useState(true)
  const navigate = useNavigate();

  const handleCheckCode = async (e)=>{
    setCheckCode(e.target.value)
  }

  const handleConfirm = ()=>{
    if(checkCode ===  "235356SWPDB537VJGHJGHVGH45453"){
      setOpen(false)
    }else{
      navigate("/admin-security")
    }    
  }


  return (
    <div>      
      <Box sx={{backgroundColor:"white"}}>
        <Box sx={{display :"grid", gridTemplateRows:"200px 1fr" ,width:"100%", height:"100%", backgroundColor:"white", marginTop:"30px",}}>
          <Box sx={{display:"flex", flexDirection:"columns", justifyContent:"space-around", zIndex:"10", }} >
            <Box> <Button sx={{fontSize:"22px", width:"100px"}}> <Link style={{textDecoration:"none"}} to="/"> <div className={classes.home} /> </Link> </Button> </Box>
            <Box> <Button sx={{fontSize:"22px", width:"300px"}}> <Link style={{textDecoration:"none"}} to="users">Users</Link> </Button> </Box>
            <Box> <Button sx={{fontSize:"22px", width:"300px"}}> <Link style={{textDecoration:"none"}} to="destinations">Destinations</Link> </Button> </Box>
            <Box> <Button sx={{fontSize:"22px", width:"300px"}}> <Link style={{textDecoration:"none"}} to="offers">Offers</Link> </Button> </Box>
          </Box>
        </Box>
      </Box>
        <Routes>
          <Route path="/users" element={<AdminUsers/>} />
          <Route path="/user/:id" element={<AdminUsersForm />} />
          <Route path="/user" element={<AdminUsersForm />} />

          <Route path="/destinations" element={<AdminDestinations/>} />
          <Route path="/destination/:id" element={<AdminDestinationsForm />} />
          <Route path="/destination" element={<AdminDestinationsForm />} />

          <Route path="/offers" element={<AdminOffers/>} />
          <Route path="/offer/:id" element={<AdminOffersForm />} />
          <Route path="/offer" element={<AdminOffersForm />} />
        </Routes>
        <Box>
          <Dialog hideBackdrop open={open}>
            <DialogContent sx={{width:"500px", height:"250px", display:"grid", gridTemplateRows:"1fr 1fr 1fr"}}>
              <h1>Enter the code:</h1>
              <TextField onBlur={handleCheckCode} sx={{width:"100%"}}></TextField>
              <Button sx={{}} onClick={handleConfirm}>Enter</Button>
            </DialogContent>
        </Dialog>
      </Box>

    </div>
  )
}

export default AdminPage