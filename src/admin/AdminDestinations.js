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
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
 
const AdminDestinations = () =>{
  const [ destinations, setUsers ] = useState([])
  const navigate = useNavigate()

  const handleModify = (id) =>{
    navigate(`/admin/destination/${id}`)
  }

  const handleDelete = async (id) =>{
    const response = await axios.delete(`http://localhost:4000/api/destinations/${id}`)
    if(response.data.deleted){
      setUsers(prevData => prevData.filter(item => item._id !== id))
    }
  }

  useEffect(()=>{
    const destinationsResponse = async ()=>{
      const response = await axios.get("http://localhost:4000/api/destinations")
      setUsers(response.data)
    }
    destinationsResponse()
  }, [])
  
return(
    <>
    <Box sx={{display: "grid", justifyContent:"end", marginRight:"80px", marginBottom:"40px"}}>
      <Link to={"/admin/destination"} ><div className={classes.add} />  </Link>
    </Box>

    <TableContainer sx={{width:"100%"}} component={Paper}>
      <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Child price</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
          {destinations.map((destination, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Avatar alt={`${destination.name}-${index}`} src={destination.image} />
              </TableCell>
              <TableCell align="center">{destination.name}</TableCell>
              <TableCell align="center">{destination.description}</TableCell>
              <TableCell align="center">{destination.country}</TableCell>
              <TableCell align="center">{destination.duration}</TableCell>
              <TableCell align="center">{destination.rating}</TableCell>
              <TableCell align="center">{destination.price}</TableCell>
              <TableCell align="center">{destination.cprice}</TableCell>
              <TableCell align="center">
                <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", alignContent:"center", justifyContent:"Center"}}>
                <Button sx={{height:"40px", width:"40px"}} color="primary" onClick={()=>handleModify(destination._id)}> <AutoFixHighIcon/> </Button>
                <Button sx={{height:"40px", width:"40px"}} color="error" onClick={()=>handleDelete(destination._id)}> <DeleteIcon /> </Button>
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

export default AdminDestinations