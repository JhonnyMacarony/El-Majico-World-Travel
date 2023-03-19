import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, useNavigate } from "react-router-dom";
import { Box, Paper, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from "./AdminUsers.module.css"
 
const AdminOffers = () =>{
  const [ offers, setUsers ] = useState([])
  const navigate = useNavigate()

  const handleModify = (id) =>{
    navigate(`/admin/offer/${id}`)
  }

  const handleDelete = async (id) =>{
    const response = await axios.delete(`http://localhost:4000/api/offers/${id}`)
    if(response.data.deleted){
      setUsers(prevData => prevData.filter(item => item._id !== id))
    }
  }

  useEffect(()=>{
    const offersResponse = async ()=>{
      const response = await axios.get("http://localhost:4000/api/offers")
      setUsers(response.data)
    }
    offersResponse()
  }, [])
return(
    <>
    <Box sx={{display: "grid", justifyContent:"end", marginRight:"80px", marginBottom:"40px"}}>
      <Link to={"/admin/offer"} ><div className={classes.add} />  </Link>
    </Box>

    <TableContainer sx={{width:"100%"}} component={Paper}>
      <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Destinations</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
          {offers.map((offer, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Avatar alt={`${offer.name}-${index}`} src={offer.image} />
              </TableCell>
              <TableCell align="center">{offer.name}</TableCell>
              <TableCell align="center">{offer.description}</TableCell>
              <TableCell align="center">{offer.destination}</TableCell>
              <TableCell align="center">{offer.duration}</TableCell>
              <TableCell align="center">{offer.rating}</TableCell>
              <TableCell align="center">{offer.price}</TableCell>
              <TableCell align="center">
                <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", alignContent:"center", justifyContent:"Center"}}>
                <Button color="primary" onClick={()=>handleModify(offer._id)}> <div className={classes.modify}/> </Button>
                <Button color="error" onClick={()=>handleDelete(offer._id)}> <div className={classes.delete}/> </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>

    </>
)
}

export default AdminOffers