import { Avatar, Box, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../Components/State/Menu/Action';

const orders=[1,1,1,1,1,1,1]
const MenuTable = () => {

    const dispatch=useDispatch();
    const {restaurant,ingredients,menu}=useSelector(store=>store)
    const jwt=localStorage.getItem("jwt")
  const navigate=useNavigate();
    useEffect(() => {
    if (restaurant?.usersRestaurant?.id && jwt) {
      dispatch(getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        jwt,
      }));
    }
  }, [restaurant?.usersRestaurant?.id]);

  if (!restaurant.usersRestaurant?.id) {
    return <Box className='p-10 text-center'>Loading restaurant data...</Box>;
  }

  const handleDeleteFood=(foodId)=>{
    dispatch(deleteFoodAction({foodId,jwt}))
  }
  return (
   <Box>
    <Card className='mt-1'>
        <CardHeader
        action={
          <IconButton onClick={()=>navigate("/admin/restaurants/add-menu")} aria-label="settings">
            <CreateIcon />
          </IconButton>
        }
        title={"Menu"}
        sx={{pt:2,alignItems:"center"}}
        
        />
        


        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    
                    <TableCell align="left">image</TableCell>
                    <TableCell align="center">title</TableCell>
                    <TableCell align="center">ingredients</TableCell>
                    <TableCell align="center">price</TableCell>
                    <TableCell align="center">Avaibility</TableCell>
                    <TableCell align="center">Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {menu.menuItems.map((item) => (
                    <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    
                    <TableCell component="th" scope="row">
                        <Avatar src={item.images[0]}></Avatar>
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.ingredients.map((ingredient)=><Chip label={ingredient.name} />)}</TableCell>
                    <TableCell align="center">₹{item.price}</TableCell>
                    <TableCell align="center">{item.available?"in_stoke":"out_of_stoke"}</TableCell>
                    <TableCell align="center"><IconButton color='primary' onClick={()=>handleDeleteFood(item.id)}><DeleteIcon /></IconButton></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
         </TableContainer>
    </Card>
   </Box>
  )
}

export default MenuTable