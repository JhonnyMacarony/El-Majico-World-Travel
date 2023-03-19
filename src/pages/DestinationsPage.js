import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';
import { Box, Button, Rating } from "@mui/material";
import classes from "./HomePage.module.css"
import YouTube from "react-youtube";

const DestinationsPage = ()=>{
    const [ destination, setPageData ] = useState({name:"", price:"", image:"", rating:"", description:"", include:"", include2:"", include3:"", include4:"", exclude:"", exclude2:"", cprice:"", ytid:""})

    const params = useParams()
    
    useEffect(()=>{
        const destinationRequest = async ()=>{
            const response = await axios.get(`http://localhost:4000/api/destinations/${params.id}`)
        setPageData(prevData=>({...prevData, ...response.data}))
        } 
        destinationRequest()
    },[params.id])
    
    useEffect(()=>{
        console.log(destination)
    },[destination])
    
    
    return(
        <Box sx={{display:"grid", gridTemplateRows:"100px 1fr 100px 1fr 1fr", padding:"50px", height:"100%"}}>
            <Box>
                <Link to={"/search-destination"}> <div className={classes.arrow} /> </Link>
            </Box>
            <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                <Box>  
                    <img alt="img1" style={{height:"auto", width:"auto", maxHeight:"600px", maxWidth:"800px",boxShadow:"rgba(43, 43, 43, 0.301) 2px 4px", borderRadius:"8px"}} src={destination.image} />
                    <br />
                    <h1 style={{fontSize:"42px"}}>{destination.name}</h1>
                    <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", alignItems:"center"}}>
                        <h3>Adult: {destination.price}</h3>
                        <h3>Child: {destination.cprice}</h3>
                    </Box>
                    <br />
                    <h3>Country: {destination.country}</h3>
                    <Box sx={{display:"flex", flexDirection:"rows", alignItems:"center"}}>
                    <h3 style={{marginRight:"15px"}}>Rating: </h3>
                    <Rating
                        name="simple-controlled"
                        value={destination.rating}
                        readOnly
                    />
                    </Box>
                </Box>
                <Box sx={{marginRight:"260px", width:"800px", height:"74%", overflow:"hidden"}}>
                    <h1>Short description</h1>
                    <p style={{marginTop:"50px", fontSize:"22px"}}>{destination.description}</p>
                </Box>
            </Box>

            <Box sx={{marginLeft:"1400px"}}>
                <Button className={classes.buy} sx={{width:"350px", height:"50px", padding:"35px", border:"3px solid green"}}> <Link to={`/purchase-mail/${destination._id}`} style={{textDecoration:"none",fontWeight:"bold", fontSize:"22px", color:"darkgreen"}}>Go for it</Link> </Button>
            </Box>

            <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"150px", height:"700px"}}>
                <Box sx={{borderRight:"2px solid black", display:"grid", justifyContent:"center"}}>
                    <h1 style={{fontWeight:"normal", fontSize:"42px"}}>Include</h1>
                    <Box sx={{display:"grid", gridTemplateRows:'1fr 1fr 1fr 1fr 1fr 1fr', marginTop:"-100px", marginLeft:"-350px"}}>
                        <h3 style={{fontWeight:"normal", fontSize:"20px"}}>• {destination.include}</h3>
                        <h3 style={{fontWeight:"normal", fontSize:"20px"}}>• {destination.include2}</h3>
                        <h3 style={{fontWeight:"normal", fontSize:"20px"}}>• {destination.include3}</h3>
                        <h3 style={{fontWeight:"normal", fontSize:"20px"}}>• {destination.include4}</h3>
                    </Box>
                </Box>
                <Box sx={{borderLeft:"2px solid black", display:"grid", justifyContent:"center"}}>
                    <h1 style={{fontWeight:"normal", fontSize:"42px"}}>Does not include</h1>
                    <Box sx={{display:"grid", gridTemplateRows:'1fr 1fr 1fr 1fr 1fr 1fr', marginTop:"-100px", marginLeft:"-210px"}}>
                        <h3 style={{fontWeight:"normal", fontSize:"20px"}}>• {destination.exclude}</h3>
                        <h3 style={{fontWeight:"normal", fontSize:"20px"}}>• {destination.exclude2}</h3>
                    </Box>
                </Box>
            </Box>
            <Box>
            <Box sx={{marginLeft:"550px", marginTop:"100px", marginBottom:"100px"}}>
                <YouTube videoId={destination.ytid} />
            </Box>

            </Box>
        </Box>
    )
}
export default DestinationsPage