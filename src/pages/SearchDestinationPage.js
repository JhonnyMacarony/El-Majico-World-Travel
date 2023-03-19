import React from 'react'
import { Box, Button, IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from "./HomePage.module.css"
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';



const SearchDestinationPage = () => {

const [ fieldToSearch ] = useState("name")
const [ filteredDestinations, setFilteredDestinations ] = useState([])
const [ searchString, setSearchString ] = useState("")
  

const [ destinations, setDestinations ] = useState([])

const handleSearchString=(e)=>{
    setSearchString(e.target.value)
}

const handleSearch=()=>{
    setFilteredDestinations(destinations.filter(destination=>destination[fieldToSearch].toLowerCase().includes(searchString.toLowerCase())))

}


useEffect(()=>{
    const destinationsResponse = async ()=>{
    const response = await axios.get("http://localhost:4000/api/destinations")
    setDestinations(response.data)
    setFilteredDestinations(response.data)
    }
    destinationsResponse()
}, [])
      
  return (
    <Box>
        <Box sx={{width:"100%", height:"210px", marginBottom:"120px"}} >
            <Box sx={{backgroundColor:"rgba(202, 202, 202, 0.714)", height:"140px"}}>
                <Navbar />
            </Box>
            <Box sx={{display: "flex", marginLeft:"700px" ,flexDirection:"row",alignItems:"center",justifyItems:"center", position:"relative", marginBottom:"150px", width:"600px", height:"0", marginTop:"-50px"}}>
                <Box className={classes.searchmod} sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", marginTop:"300px"}}>
                    <input type="text" style={{color:"black",height:"30px",backgroundColor:"transparent",padding:"12px",fontSize:"18px", width:"500px", borderRadius:"10px", border:"2px solid black"}} value={searchString} onChange={handleSearchString} placeholder="Enter your destination" ></input>
                    <IconButton style={{color:"black", marginLeft:"10px"}} onClick={handleSearch}><div className={classes.search}></div></IconButton>
                </Box>
        </Box>

        </Box>

        <Box>
        {filteredDestinations.map((destination, index) => (
            <Box
                key={index}
                sx={{marginBottom:"150px"}}
            >
                <Box className={classes.bordermod} sx={{display:"grid", gridTemplateColumns:"100px 1fr 300px", border:"2px solid black", padding:"20px", margin:"10px 10px", borderRadius:"5px"}}>
                    <Box>
                        <Avatar sx={{height:"170px", width:"170px", marginLeft:"80px"}} alt={`${destination.name}-${index}`} src={destination.image} />
                    </Box>
                    <Box>
                        <h1 style={{marginLeft:"300px", fontSize:"42px"}} align="start">{destination.name}</h1>
                        <p style={{marginTop:"50px", fontSize:"22px", marginLeft:"350px"}} >{destination.description}</p>
                        <Box sx={{display:"flex", flexDirection:"columns", justifyContent:"space-around", marginTop:"75px", width:"100%", fontSize:"16px"}}>
                            <div />
                            <div />
                            <p align="center">Country: <p style={{marginLeft:"15px"}}>{destination.country}</p> </p>
                            <p align="center">Duration: <p style={{marginLeft:"15px"}}>{destination.duration}</p> </p>
                            <p align="center">Rating: <p style={{marginLeft:"15px"}}>{destination.rating}</p> </p>
                            <p align="center">Price: <p style={{marginLeft:"15px"}}>{destination.price}</p> </p>
                            <div />
                            <div />
                        </Box>
                    </Box>
                    <Box>
                        <Button className={classes.goforit} sx={{padding:"30px", border:"3px solid rgb(0, 47, 255)", borderRadius:"10px", width:"200px", height:"50px", marginTop:"250px", marginLeft:"10px"}} > <Link to={`/destinations/${destination._id}`} style={{textDecoration:"none", fontSize:"20px", color:"rgb(0, 47, 255)", fontWeight:"bold"}}>Go for it</Link> </Button>
                    </Box>
                </Box>
            </Box>
        ))}
        </Box>
    </Box>
  )
}

export default SearchDestinationPage