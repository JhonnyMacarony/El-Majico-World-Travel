import { TextField, Button, Dialog, DialogContent } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileInput from './FileInput';
import FilePreview from './FilePreview';
import ImageLoadDialog from "./ImageLoadDialog"
import { useNavigate, useParams  } from "react-router-dom";

const AdminOffersForm = () => {
    const [fileLoaded, setFileLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState("")
    const [close, setClose] = useState(true)
    const [checkCode, setCheckCode] = useState('')
  

    const [ nameHasError, setNameHasError ] = useState(false);
    const [ nameError, setNameError ] = useState("")

    const [ destinationsError, setDestinationsError ] = useState("")
    const [ destinationsHasError, setDestinationsHasError ] = useState(false)

    const [ descriptionError, setDescriptionError ] = useState("")
    const [ descriptionHasError, setDescriptionHasError ] = useState(false)

    const [ durationError, setDurationError ] = useState("")
    const [ durationHasError, setDurationHasError ] = useState(false)

    const [ ratingError, setRatingError ] = useState("")
    const [ ratingHasError, setRatingHasError ] = useState(false)

    const [ priceError, setPriceError ] = useState("")
    const [ priceHasError, setPriceHasError ] = useState(false)

    const [ cpriceError, setCpriceError ] = useState("")
    const [ cpriceHasError, setCpriceHasError ] = useState(false)

    const [ dataLoaded, setDataLoaded ] = useState(false)
    const [ offers, setOffers ] = useState([])
    const [ mustCreate, setMustCreate ] = useState(false)
    const [ currentOffer, setCurrentOffer ] = useState({name: "",  description:"", destinations:"", duration:"", rating:"", price:"", image:"", cprice:""})
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
      if(e.target.value.length > 2){
        setNameHasError(false)
        setNameError("")
      }else{
        setNameHasError(true)
        setNameError("The field must have at least 4 characters")
      }
    }
      if(e.type === "change"){
      setCurrentOffer(prevData =>(
        {
          ...prevData, name: e.target.value
        }
      ))
      }
    }

    const handleDestinations = (e)=>{
      if(e.type === "blur"){
      if(e.target.value.length > 3 ){
          setDestinationsHasError(false)
          setDestinationsError("")       
      }else {
        setDestinationsHasError(true)
        setDestinationsError(`The field must have ${e.target.value.length < 3 ? "minimum" : "maximum"} 30 characters`)
      }}
      if(e.type === "change"){
      setCurrentOffer(prevData =>(
        {
          ...prevData, destinations: e.target.value
        }
      ))
      }
    }

    const handleDuration = (e)=>{
      if(e.type === "blur"){
      if(e.target.value.length === 0 ){
        setDurationHasError(true)
        setDurationError("The field is mandatory")
      }}
      if(e.type === "change"){
      setCurrentOffer(prevData =>(
        {
          ...prevData, duration: e.target.value
        }
      ))
      }
    }

    const handleRating = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setRatingHasError(true)
          setRatingError("The field is mandatory")
        }}
        if(e.type === "change"){
        setCurrentOffer(prevData =>(
          {
            ...prevData, rating: e.target.value
          }
        ))
        }
      }  

      const handlePrice = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setPriceHasError(true)
          setPriceError("The field is mandatory")
        }}
        if(e.type === "change"){
        setCurrentOffer(prevData =>(
          {
            ...prevData, price: e.target.value
          }
        ))
        }
      }  

      const handleCprice = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setCpriceHasError(true)
          setCpriceError("The field is mandatory")
        }}
        if(e.type === "change"){
        setCurrentOffer(prevData =>(
          {
            ...prevData, cprice: e.target.value
          }
        ))
        }
      }  

      const handleDescription = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setDescriptionHasError(true)
          setDescriptionError("The field is mandatory")
        }}
        if(e.type === "change"){
        setCurrentOffer(prevData =>(
          {
            ...prevData, description: e.target.value
          }
        ))
        }
      }  

    const handleSubmit = async (e) =>{
      e.preventDefault()
      const {name, duration, description, rating, price, destinations, cprice} = e.target.elements
      const data = {
        name: name.value,
        description: description.value,
        destinations: destinations.value,
        duration: duration.value,
        rating: rating.value,
        price: price.value,
        cprice: cprice.value,
        image,    
      }
 
        const response = mustCreate ? 
                        await axios.post("http://localhost:4000/api/offers", data) : 
                        await axios.put(`http://localhost:4000/api/offers/${id}`, {...data, id})

        if(await response.data){
          setOffers(response.data)
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
        const offerRequest = async ()=>{
          const response = await axios.get(`http://localhost:4000/api/offers/${id}`)
          setCurrentOffer(prevData=>({...prevData, ...response.data}))
          setFileLoaded(true)
          setImage(response.data.image)  
        }
        offerRequest()
      }else{
        setMustCreate(true)
      }
    }, [id])
  return (
    <Box sx={{display:"grid", gridTemplateColumns:"1fr 450px 1fr", marginBottom:"300px", justifyContent:"center", alignItems:"center", marginLeft:"-400px"}} >
      <Box sx={{gridColumn:"2/3", 
              p:"24px",
              background:"#ededed", 
              height:"100vh", 
              width:"800px", 
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
                  <TextField id="name" error={nameHasError} helperText={nameHasError && nameError} onChange ={handleName} onBlur ={handleName} value={currentOffer.name}  fullWidth label="Offer name" variant="outlined"/>
                  <TextField id="description" error={descriptionHasError} helperText={descriptionHasError && descriptionError} onChange ={handleDescription} onBlur ={handleDescription} value={currentOffer.description} multiline rows={4} fullWidth label="Description" variant="outlined"/>
                  <TextField id="duration" error={durationHasError} helperText={ durationHasError && durationError } onChange={handleDuration} onBlur ={handleDuration} value={currentOffer.duration} fullWidth label="Duration" variant="outlined"/>
                  <TextField id="destinations" error={destinationsHasError} helperText={ destinationsHasError && destinationsError } onChange={handleDestinations} onBlur ={handleDestinations} value={currentOffer.destinations} fullWidth  label="Destinations" variant="outlined"/>
                  <TextField id="rating" error={ratingHasError} helperText={ ratingHasError && ratingError } onChange={handleRating} onBlur ={handleRating} value={currentOffer.rating} fullWidth  label="Rating" variant="outlined"/>
                  <TextField id="price" error={priceHasError} helperText={ priceHasError && priceError } onChange={handlePrice} onBlur ={handlePrice} value={currentOffer.price} fullWidth  label="Price" variant="outlined"/>
                  <TextField id="cprice" error={cpriceHasError} helperText={ cpriceHasError && cpriceError } onChange={handleCprice} onBlur ={handleCprice} value={currentOffer.cprice} fullWidth  label="Child price" variant="outlined"/>                
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

export default AdminOffersForm