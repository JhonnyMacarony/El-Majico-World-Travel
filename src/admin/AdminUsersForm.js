import { TextField, Button, Dialog, DialogContent } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileInput from './FileInput';
import FilePreview from './FilePreview';
import ImageLoadDialog from "./ImageLoadDialog"
import { useNavigate, useParams  } from "react-router-dom";

const AdminUsersForm = () => {
    const [,setFileLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState("")

    const [ nameHasError, setNameHasError ] = useState(false);
    const [ nameError, setNameError ] = useState("")

    const [ phoneError, setPhoneError ] = useState("")
    const [ phoneHasError, setPhoneHasError ] = useState(false)

    const [ codeError, setCodeError ] = useState("")
    const [ codeHasError, setCodeHasError ] = useState(false)

    const [ emailError, setEmailError ] = useState("")
    const [ emailHasError, setEmailHasError ] = useState(false)

    const [close, setClose] = useState(true)
    const [checkCode, setCheckCode] = useState('')

    const [ dataLoaded ] = useState(false)
    const [ ,setUsers ] = useState([])
    const [ mustCreate, setMustCreate ] = useState(false)
    const [ currentUser, setCurrentUser ] = useState({email: "", name:"", phone:"", image:"", code:""})
    const navigate = useNavigate();
    const {id} = useParams()
  
    const handleClose=()=>{
      setOpen(false)
    }
  
    const handlePath =(response)=>{
      setOpen(false)
      setFileLoaded(true)
      setImage(response.path)
    }

    const handleName = (e)=>{
      if(e.type === "blur"){
      if(e.target.value.length > 3){
        setNameHasError(false)
        setNameError("")
      }else{
        setNameHasError(true)
        setNameError("The field must have at least 3 characters")
      }
    }
      if(e.type === "change"){
      setCurrentUser(prevData =>(
        {
          ...prevData, name: e.target.value
        }
      ))
      }
    }

    const handlePhone = (e)=>{
      if(e.type === "blur"){
      if(e.target.value.length === 10 ){
        if(isNaN(e.target.value)){
          setPhoneHasError(true)
          setPhoneError("The field must contain only numbers")
        }else{
          setPhoneHasError(false)
          setPhoneError("")  
        }
      }else {
        setPhoneHasError(true)
        setPhoneError(`The field must have ${e.target.value.length < 10 ? "minimum" : "maximum"} 10 characters`)
      }}
      if(e.type === "change"){
      setCurrentUser(prevData =>(
        {
          ...prevData, phone: e.target.value
        }
      ))
      }
    }

    const handleEmail = (e)=>{
      if(e.type === "blur"){
      if(e.target.value.length === 0 ){
        setEmailHasError(true)
        setEmailError("The field is mandatory")
      }else{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( re.test(String(e.target.value).toLowerCase())){
          setEmailHasError(false)
          setEmailError("")  
        }else{
          setEmailHasError(true)
          setEmailError("Enter a valid email address")  
        }
      }}
      if(e.type === "change"){
      setCurrentUser(prevData =>(
        {
          ...prevData, email: e.target.value
        }
      ))
      }
    }

    const handleCode = (e)=>{
      if(e.type === "blur"){
      if(e.target.value.length > 3){
        setCodeHasError(false)
        setCodeError("")
      }else{
        setCodeHasError(true)
        setCodeError("The field must have at least 3 characters")
      }
    }
      if(e.type === "change"){
      setCurrentUser(prevData =>(
        {
          ...prevData, code: e.target.value
        }
      ))
      }
    }

    const handleSubmit = async (e) =>{
      e.preventDefault()
      const {name, email, phone, code} = e.target.elements
      const data = {
        name: name.value,
        code: code.value,
        phone: phone.value,
        email: email.value,
        image,    
      }
 
        const response = mustCreate ? 
                        await axios.post("http://localhost:4000/api/users", data) : 
                        await axios.put(`http://localhost:4000/api/users/${id}`, {...data, id})

        if(await response.data){
          setUsers(response.data)
          navigate("/")
        }  

    }

    const handleCheckCode = async (e)=>{
      setCheckCode(e.target.value)
    }
  
    const handleConfirm = ()=>{
      if(checkCode ===  "235356SWPDB537VJGHJGHVGH45453"){
        setClose(false)
      }else{
        navigate("/admin-security")
      }    
    }
    
  
    const handleFile = (data)=>{
      if(data){
        setFileLoaded(true)
        setImage(data)
        setOpen(true)
      }
    }  
    
    useEffect(()=>{
      if(id){
        const userRequest = async ()=>{
          const response = await axios.get(`http://localhost:4000/api/users/${id}`)
          setCurrentUser(prevData=>({...prevData, ...response.data}))
          setFileLoaded(true)
          setImage(response.data.image)  
        }
        userRequest()
      }else{
        setMustCreate(true)
      }
    }, [id])
  return (
    <Box sx={{display:"grid", gridTemplateColumns:"1fr 450px 1fr"}} >
      <Box sx={{gridColumn:"2/3", 
              p:"24px",
              background:"#ededed", 
              height:"100vh", 
              display:"flex", 
              flexDirection:"column",
              }}>
        {!dataLoaded&& <Box id="my_form"
         component="form" 
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{
                display:"flex",  
                flexDirection:"column",
                gap:"24px",
          '& .MuiTextField-root':{
            marginLeft:"auto",
            h: "74px"
      }}}>
                  <TextField id="name" error={nameHasError} helperText={nameHasError && nameError} onChange ={handleName} onBlur ={handleName} value={currentUser.name}  fullWidth label="Username" variant="outlined"/>
                  <TextField id="email" error={emailHasError} helperText={ emailHasError && emailError } onChange={handleEmail} onBlur ={handleEmail} value={currentUser.email} fullWidth label="Email" variant="outlined"/>
                  <TextField id="phone" error={phoneHasError} helperText={ phoneHasError && phoneError } onChange={handlePhone} onBlur ={handlePhone} value={currentUser.phone} fullWidth  label="Phone" variant="outlined"/>
                  <TextField id="code" error={codeHasError} helperText={ codeHasError && codeError } onChange={handleCode} onBlur ={handleCode} value={currentUser.code} fullWidth  label="Code" variant="outlined"/>                
                <Box>
                  <FileInput onFileLoaded={handleFile}/>
                  <FilePreview rounded={true} image={image}/>
                </Box>
        </Box>}
        <Button form="my_form" type="submit" color="error" variant="contained">Send data</Button> 
        </Box>
        <ImageLoadDialog open={open} ratio={1} onClose={handleClose} onPath={handlePath} image={image}/>

        <Dialog hideBackdrop open={close}>
            <DialogContent sx={{width:"500px", height:"250px", display:"grid", gridTemplateRows:"1fr 1fr 1fr"}}>
              <h1>Enter the code:</h1>
              <TextField onBlur={handleCheckCode} sx={{width:"100%"}}></TextField>
              <Button sx={{}} onClick={handleConfirm}>Enter</Button>
            </DialogContent>
        </Dialog>

    </Box>
)
}

export default AdminUsersForm