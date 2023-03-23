import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';
import { Box, Button, Rating } from "@mui/material";
import classes from "./HomePage.module.css"

const OffersPage = ()=>{
    const [ offer, setPageData ] = useState({name:"", price:"", image:"", rating:"", description:"", destinations:"", cprice:""})

    const params = useParams()
    
    useEffect(()=>{
        const offerRequest = async ()=>{
            const response = await axios.get(`http://localhost:4000/api/offers/${params.id}`)
        setPageData(prevData=>({...prevData, ...response.data}))
        } 
        offerRequest()
    },[params.id])
    
    useEffect(()=>{
        console.log(offer)
    },[offer])
    
    
    return(
        <Box sx={{display:"grid", gridTemplateRows:"100px 1fr 100px 1fr", margin:"50px"}}>
            <Box>
                <Link to={"/hot-offers"}> <div className={classes.arrow} /> </Link>
            </Box>
            <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                <Box>  
                    <img alt="img1" style={{height:"auto", width:"auto", maxHeight:"600px", maxWidth:"800px",boxShadow:"rgba(43, 43, 43, 0.301) 2px 4px", borderRadius:"8px"}} src={offer.image} />
                    <h1 style={{fontSize:"42px"}}>{offer.name}</h1>
                    <br/>
                    <h3>Destinations: {offer.destinations}</h3>
                    <br />
                    <h3>Adult cost: {offer.price}</h3>
                    <h3>Child cost: {offer.cprice}</h3>
                    <br />
                    <Box sx={{display:"flex", flexDirection:"rows", alignItems:"center"}}>
                        <h3 style={{marginRight:"15px"}}>Rating:</h3>
                        <Rating
                            name="simple-controlled"
                            value={offer.rating}
                            readOnly
                        />
                    </Box>
                </Box>
                <Box sx={{marginRight:"260px", width:"800px"}}>
                    <h1>Short description</h1>
                    <p style={{marginTop:"50px", fontSize:"22px"}}>{offer.description}</p>
                </Box>
            </Box>

            <Box sx={{marginLeft:"1400px"}}>
                <Button className={classes.buy} sx={{width:"350px", height:"50px", padding:"35px", border:"3px solid green"}}> <Link to={`/purchase-mail-offer/${offer._id}`} style={{textDecoration:"none",fontWeight:"bold", fontSize:"22px", color:"darkgreen"}}>Go for it</Link> </Button>
            </Box>
        </Box>
    )
}
export default OffersPage