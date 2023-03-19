import { Box, Button, Dialog, DialogContent, Modal } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from "./AdminSecurity.module.css"

const AdminSecurity = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [open, setOpen] = useState(true)
  const [close, setClose] = useState(false)


  const handleEmail = (e)=> {
    setEmail(e.target.value)
  }

  const handlePassword = (e)=> {
    setPassword(e.target.value)
  }
  
  const handleSubmit = () =>{
    if(email === "elmajicotraveladmin@gmail.com" && password === "637456#elmajicotravel$FGHJKMLOP#1345"){
      setOpen(false)
      setClose(true)
    } else {
      alert("Try again")
    }
  }

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", width:"100%", height:"100%" }} >
      <div className={classes.background} />
      <Modal hideBackdrop open={open}>
        <Box sx={{ display:"grid", gridTemplateRows:"300px 70px 120px 120px 180px", justifyContent:"center", alignItems:"center", height:"93.69vh", width:"45vw", backgroundColor:"rgba(0, 0, 0, 0.541)", padding:"30px", position:"relative", marginLeft:"996px" }}>
            <div className={classes.logo} />
            <h1 style={{color:'white', fontSize:"54px", marginLeft:"85px"}}>Welcome</h1>
            <input id='email' onBlur={handleEmail} style={{width:"400px", height:"40px", backgroundColor:"transparent", border:"3px solid white", borderRadius:"20px", padding:"7px", color:"white", }} label="Enter your email" variant="outlined" placeholder='Enter your email' />
            <input id='password' onBlur={handlePassword} style={{width:"400px", height:"40px", backgroundColor:"transparent", border:"3px solid white", borderRadius:"20px", padding:"7px", color:"white"}} label="Enter your email" variant="outlined" placeholder='Enter your password' />
            <Button sx={{color:"white", fontSize:"21px", borderRadius:"6px", backgroundColor:"rgba(255, 255, 255, 0.252)"}} onClick={handleSubmit} > Confirm </Button>
        </Box>
      </Modal>
      <Dialog open={close}>
        <DialogContent sx={{width:"500px", height:"250px"}}>
          <h1>Code: </h1>
          <p>235356SWPDB537VJGHJGHVGH45453</p>
          <Button> <Link style={{textDecoration:"none", color:"green", fontSize:"22px"}} to="/admin/*" >Admin</Link> </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminSecurity