import React from 'react'
import { Box, Button, IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from "./HomePage.module.css"
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';



const SearchOfferPage = () => {

const [ fieldToSearch ] = useState("name")
const [ filteredOffers, setFilteredOffers ] = useState([])
const [ searchString, setSearchString ] = useState("")
  

const [ offers, setOffers ] = useState([])

const handleSearchString=(e)=>{
    setSearchString(e.target.value)
}

const handleSearch=()=>{
    setFilteredOffers(offers.filter(offer=>offer[fieldToSearch].toLowerCase().includes(searchString.toLowerCase())))

}


useEffect(()=>{
    const offersResponse = async ()=>{
    const response = await axios.get("http://localhost:4000/api/offers")
    setOffers(response.data)
    setFilteredOffers(response.data)
    }
    offersResponse()
}, [])
      
  return (
    <Box>
        <Box sx={{width:"100%", height:"250px", marginBottom:"70px"}} >
            <Box sx={{backgroundColor:"rgba(202, 202, 202, 0.714)", height:"140px"}}>
                <Navbar />
            </Box>
            <Box sx={{display: "flex", marginLeft:"700px" ,flexDirection:"row",alignItems:"center",justifyItems:"center", position:"relative", marginBottom:"150px", width:"600px", height:"0", marginTop:"-50px"}}>
                <Box className={classes.searchmod} sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", marginTop:"300px"}}>
                    <input type="text" style={{color:"black",height:"30px",backgroundColor:"transparent",padding:"12px",fontSize:"18px", width:"500px", borderRadius:"10px", border:"2px solid black"}} value={searchString} onChange={handleSearchString} placeholder="Enter your offer" ></input>
                    <IconButton style={{color:"black", marginLeft:"10px"}} onClick={handleSearch}><div className={classes.search}></div></IconButton>
                </Box>
        </Box>

        </Box>

        <Box>
        {filteredOffers.map((offer, index) => (
            <Box
                key={index}
                sx={{marginBottom:"150px"}}
            >
                <Box className={classes.bordermod} sx={{display:"grid", gridTemplateRows:"400px 1fr 400px", border:"2px solid gray", padding:"20px", margin:"10px 10px", borderRadius:"5px", width:"650px", height:"550px"}}>
                    <Box sx={{display:"grid", gridTemplateColumns:"1fr 400px"}}>
                        <Avatar sx={{height:"170px", width:"170px", marginLeft:"80px"}} alt={`${offer.name}-${index}`} src={offer.image} />
                        <h1 style={{marginLeft:"100px", fontSize:"35px"}} align="start">{offer.name}</h1>
                    </Box>
                    <Box>
                        <p style={{marginTop:"-180px", fontSize:"22px", marginLeft:"20px"}} >{offer.description}</p>
                        <Box sx={{display:"flex", flexDirection:"columns", justifyContent:"space-around", marginTop:"75px", width:"100%", fontSize:"16px"}}>
                            <div />
                            <p style={{marginLeft:"-52px", marginRight:"25px"}} align="center">Destinations: <p >{offer.destinations}</p> </p>
                            <p style={{ marginRight:"25px"}} align="center">Duration: <p style={{marginLeft:"15px"}}>{offer.duration}</p> </p>
                            <p style={{ marginRight:"25px"}} align="center">Price: <p style={{marginLeft:"15px"}}>{offer.price}</p> </p>
                            <div />
                        </Box>
                    </Box>
                    <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"15px"}}>
                        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"10px", fontSize:"26px"}}>
                            <p style={{ marginRight:"35px"}} align="center">Rating: </p>
                            <p style={{marginLeft:"-20px"}}>{offer.rating}</p>
                        </div>
                        <Button className={classes.goforit} sx={{padding:"30px", border:"3px solid rgb(0, 47, 255)", borderRadius:"10px", width:"270px", height:"70px", marginTop:"20px", marginLeft:"10px"}} > <Link to={`/offers/${offer._id}`} style={{textDecoration:"none", fontSize:"20px", color:"rgb(0, 47, 255)", fontWeight:"bold", width:"370px"}}>Go for it</Link> </Button>
                    </Box>
                </Box>
            </Box>
        ))}
        </Box>
    </Box>
  )
}

export default SearchOfferPage