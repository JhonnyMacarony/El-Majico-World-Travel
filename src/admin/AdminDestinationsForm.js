import { TextField, Button, Dialog, DialogContent } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileInput from './FileInput';
import FilePreview from './FilePreview';
import ImageLoadDialog from "./ImageLoadDialog"
import { useNavigate, useParams  } from "react-router-dom";

const AdminDestinationsForm = () => {
  const [,setFileLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState("")
  const [close, setClose] = useState(true)
  const [checkCode, setCheckCode] = useState('')  

    const [ nameHasError, setNameHasError ] = useState(false);
    const [ nameError, setNameError ] = useState("")

    const [ countryError, setCountryError ] = useState("")
    const [ countryHasError, setCountryHasError ] = useState(false)

    const [ descriptionError, setDescriptionError ] = useState("")
    const [ descriptionHasError, setDescriptionHasError ] = useState(false)

    const [ durationError, setDurationError ] = useState("")
    const [ durationHasError, setDurationHasError ] = useState(false)

    const [ ratingError, setRatingError ] = useState("")
    const [ ratingHasError, setRatingHasError ] = useState(false)

    const [ includeError, setIncludeError ] = useState("")
    const [ includeHasError, setIncludeHasError ] = useState(false)

    const [ include2Error, setInclude2Error ] = useState("")
    const [ include2HasError, setInclude2HasError ] = useState(false)

    const [ include3Error, setInclude3Error ] = useState("")
    const [ include3HasError, setInclude3HasError ] = useState(false)

    const [ include4Error, setInclude4Error ] = useState("")
    const [ include4HasError, setInclude4HasError ] = useState(false)

    const [ excludeError, setExcludeError ] = useState("")
    const [ excludeHasError, setExcludeHasError ] = useState(false)

    const [ exclude2Error, setExclude2Error ] = useState("")
    const [ exclude2HasError, setExclude2HasError ] = useState(false)

    const [ priceError, setPriceError ] = useState("")
    const [ priceHasError, setPriceHasError ] = useState(false)

    const [ ,setCpriceError ] = useState("")
    const [ cpriceHasError, setCpriceHasError ] = useState(false)

    const [ ytidError, setYtidError ] = useState("")
    const [ ytidHasError, setYtidHasError ] = useState(false)


    const [ dataLoaded ] = useState(false)
    const [ ,setDestinations ] = useState([])
    const [ mustCreate, setMustCreate ] = useState(false)
    const [ currentDestination, setCurrentDestination ] = useState({name: "", ytid:"", include:"", include2:"", include3:"", include4:"", exclude:"", exclude2:"", description:"", country:"", duration:"", rating:"", price:"", cprice:"", image:""})
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
      setCurrentDestination(prevData =>(
        {
          ...prevData, name: e.target.value
        }
      ))
      }
    }

    const handleCountry = (e)=>{
      if(e.type === "blur"){
      if(e.target.value.length > 3 ){
          setCountryHasError(false)
          setCountryError("")       
      }else {
        setCountryHasError(true)
        setCountryError(`The field must have ${e.target.value.length < 3 ? "minimum" : "maximum"} 56 characters`)
      }}
      if(e.type === "change"){
      setCurrentDestination(prevData =>(
        {
          ...prevData, country: e.target.value
        }
      ))
      }
    }

    const handleDuration = (e)=>{
      if(e.type === "blur"){
      if(e.target.value.length === 0 ){
        setDurationHasError(true)
        setDurationError("The field is mandatory")
      }}else{
        setDurationHasError(false)
        setDurationError("")
      }
      if(e.type === "change"){
      setCurrentDestination(prevData =>(
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
        }}else{
          setRatingHasError(false)
          setRatingError("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, rating: e.target.value
          }
        ))
        }
      }  

      const handleInclude = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setIncludeHasError(true)
          setIncludeError("The field is mandatory")
        }}else{
          setIncludeHasError(false)
          setIncludeError("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, include: e.target.value
          }
        ))
        }
      }  

      const handleInclude2 = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setInclude2HasError(true)
          setIncludeError("The field is mandatory")
        }}else{
          setInclude2HasError(false)
          setInclude2Error("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, include2: e.target.value
          }
        ))
        }
      }  

      const handleInclude3 = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setInclude3HasError(true)
          setInclude3Error("The field is mandatory")
        }}else{
          setInclude3HasError(false)
          setInclude3Error("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, include3: e.target.value
          }
        ))
        }
      }  

      const handleInclude4 = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setInclude4HasError(true)
          setInclude4Error("The field is mandatory")
        }}else{
          setInclude4HasError(false)
          setInclude4Error("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, include4: e.target.value
          }
        ))
        }
      }  

      const handleExclude = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setExcludeHasError(true)
          setExcludeError("The field is mandatory")
        }}else{
          setExcludeHasError(false)
          setExcludeError("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, exclude: e.target.value
          }
        ))
        }
      }  

      const handleExclude2 = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setExclude2HasError(true)
          setExclude2Error("The field is mandatory")
        }}else{
          setExclude2HasError(false)
          setExclude2Error("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, exclude2: e.target.value
          }
        ))
        }
      }  

      const handleYtid = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setYtidHasError(true)
          setYtidError("The field is mandatory")
        }}else{
          setYtidHasError(false)
          setYtidError("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, ytid: e.target.value
          }
        ))
        }
      }  

      const handlePrice = (e)=>{
        if(e.type === "blur"){
        if(e.target.value.length === 0 ){
          setPriceHasError(true)
          setPriceError("The field is mandatory")
        }}else{
          setPriceHasError(false)
          setPriceError("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
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
        }}else{
          setCpriceHasError(false)
          setCpriceError("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
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
        }}else{
          setDescriptionHasError(false)
          setDescriptionError("")
        }
        if(e.type === "change"){
        setCurrentDestination(prevData =>(
          {
            ...prevData, description: e.target.value
          }
        ))
        }
      }  


    const handleSubmit = async (e) =>{
      e.preventDefault()
      const {name, duration, description, rating, include, include2, include3, include4, exclude, exclude2, price, cprice, country, ytid} = e.target.elements
      const data = {
        name: name.value,
        ytid: ytid.value,
        country: country.value,
        description: description.value,
        duration: duration.value,
        rating: rating.value,
        include: include.value,
        include2: include2.value,
        include3: include3.value,
        include4: include4.value,
        exclude: exclude.value,
        exclude2: exclude2.value,
        price: price.value,
        cprice: cprice.value,
        image,    
      }
 
        const response = mustCreate ? 
                        await axios.post("http://localhost:4000/api/destinations", data) : 
                        await axios.put(`http://localhost:4000/api/destinations/${id}`, {...data, id})

        if(await response.data){
          setDestinations(response.data)
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
          const destinationRequest = async ()=>{
            const response = await axios.get(`http://localhost:4000/api/destinations/${id}`)
            setCurrentDestination(prevData=>({...prevData, ...response.data}))
            setFileLoaded(true)
            setImage(response.data.image)  
          }
          destinationRequest()
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
                  <TextField id="name" error={nameHasError} helperText={nameHasError && nameError} onChange ={handleName} onBlur ={handleName} value={currentDestination.name}  fullWidth label="Destination name" variant="outlined"/>
                  <TextField id="description" error={descriptionHasError} helperText={descriptionHasError && descriptionError} onChange ={handleDescription} onBlur ={handleDescription} value={currentDestination.description} multiline rows={8} fullWidth label="Description" variant="outlined"/>
                  <TextField id="duration" error={durationHasError} helperText={ durationHasError && durationError } onChange={handleDuration} onBlur ={handleDuration} value={currentDestination.duration} fullWidth label="Duration" variant="outlined"/>
                  <TextField id="country" error={countryHasError} helperText={ countryHasError && countryError } onChange={handleCountry} onBlur ={handleCountry} value={currentDestination.country} fullWidth  label="Country" variant="outlined"/>
                  <TextField id="rating" error={ratingHasError} helperText={ ratingHasError && ratingError } onChange={handleRating} onBlur ={handleRating} value={currentDestination.rating} fullWidth  label="Rating" variant="outlined"/>
                  
                  <h1>Include</h1>
                  <TextField id="include" error={includeHasError} helperText={ includeHasError && includeError } onChange={handleInclude} onBlur ={handleInclude} value={currentDestination.include} fullWidth  label="Include" multiline rows={2} variant="outlined"/>
                  <TextField id="include2" error={include2HasError} helperText={ include2HasError && include2Error } onChange={handleInclude2} onBlur ={handleInclude2} value={currentDestination.include2} fullWidth  label="Include" multiline rows={2} variant="outlined"/>
                  <TextField id="include3" error={include3HasError} helperText={ include3HasError && include3Error } onChange={handleInclude3} onBlur ={handleInclude3} value={currentDestination.include3} fullWidth  label="Include" multiline rows={2} variant="outlined"/>
                  <TextField id="include4" error={include4HasError} helperText={ include4HasError && include4Error } onChange={handleInclude4} onBlur ={handleInclude4} value={currentDestination.include4} fullWidth  label="Include" multiline rows={2} variant="outlined"/>
                  <h1>Exclude</h1>
                  <TextField id="exclude" error={excludeHasError} helperText={ excludeHasError && excludeError } onChange={handleExclude} onBlur ={handleExclude} value={currentDestination.exclude} fullWidth  label="Exclude" multiline rows={2} variant="outlined"/>
                  <TextField id="exclude2" error={exclude2HasError} helperText={ exclude2HasError && exclude2Error } onChange={handleExclude2} onBlur ={handleExclude2} value={currentDestination.exclude2} fullWidth  label="Exclude" multiline rows={2} variant="outlined"/>
                  
                  <TextField id="price" error={priceHasError} helperText={ priceHasError && priceError } onChange={handlePrice} onBlur ={handlePrice} value={currentDestination.price} fullWidth  label="Adult price" variant="outlined"/>
                  <TextField id="cprice" error={cpriceHasError} helperText={ cpriceHasError && ytidError } onChange={handleCprice} onBlur ={handleCprice} value={currentDestination.cprice} fullWidth  label="Child price" variant="outlined"/>
                  <TextField id="ytid" error={ytidHasError} helperText={ ytidHasError && ytidError } onChange={handleYtid} onBlur ={handleYtid} value={currentDestination.ytid} fullWidth  label="Youtube ID" variant="outlined"/>
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

export default AdminDestinationsForm