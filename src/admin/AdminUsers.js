import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, useNavigate } from "react-router-dom";
import { Box, IconButton, Icon, Paper, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from "./AdminUsers.module.css"
 
const AdminUsers = () =>{
  const [ users, setUsers ] = useState([])
  const navigate = useNavigate()

  const handleModify = (id) =>{
    navigate(`/admin/user/${id}`)
  }

  const handleDelete = async (id) =>{
    const response = await axios.delete(`http://localhost:4000/api/users/${id}`)
    if(response.data.deleted){
      setUsers(prevData => prevData.filter(item => item._id !== id))
    }
  }

  useEffect(()=>{
    const usersResponse = async ()=>{
      const response = await axios.get("http://localhost:4000/api/users")
      setUsers(response.data)
    }
    usersResponse()
  }, [])
return(
    <>
    <Box sx={{display: "grid", justifyContent:"end", marginRight:"80px", marginBottom:"40px"}}>
      <Link to={"/admin/user"} ><div className={classes.add} />  </Link>
    </Box>

    <TableContainer sx={{width:"100%"}} component={Paper}>
      <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Avatar alt={`${user.name}-${index}`} src={user.image} />
              </TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.phone}</TableCell>
              <TableCell align="center">
                <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", alignContent:"center", justifyContent:"Center"}}>
                <Button color="primary" onClick={()=>handleModify(user._id)}> <div className={classes.modify}/> </Button>
                <Button color="error" onClick={()=>handleDelete(user._id)}> <div className={classes.delete}/> </Button>
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

export default AdminUsers