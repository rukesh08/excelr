import {  Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, dividerClasses, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../Components/State/RestaurantOrder/Action';
const orderStatus=[
    {label:"Pending" , value: "PENDING"},
    {label:"Completed" , value: "COMPLETED"},
    {label:"Out For Delivery" , value: "OUT_FOR_DELIVERY"},
    {label:"Pending" , value: "DELIVERED"},
]
const OrderTable = () => {

    const dispatch=useDispatch();
    const {restaurant,ingredients,menu}=useSelector(store=>store)
    const restaurantOrder = useSelector(state => state.restaurantOrder);
    const jwt=localStorage.getItem("jwt")

    useEffect(() => {
  if (restaurant?.usersRestaurant?.id && jwt) {
    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId: restaurant.usersRestaurant.id,
    }));
  }
}, [restaurant?.usersRestaurant?.id]);

    const handleUpdateOrder=(orderId,orderStatus)=>{
       dispatch(updateOrderStatus({orderId,orderStatus,jwt}))
       handleClose(); 
    }

 const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   <Box>
    <Card className='mt-1'>
        <CardHeader
        title={"All Orders"}
        sx={{pt:2,alignItems:"center"}}
        
        />

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="center">image</TableCell>
                    <TableCell align="center">customer</TableCell>
                    <TableCell align="center">price</TableCell>
                    <TableCell align="center">name</TableCell>
                    <TableCell align="center">ingredients</TableCell>
                    <TableCell align="center">status</TableCell>
                    <TableCell align="center">update</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {restaurantOrder.orders.map((item) => (
                    <TableRow
                    key={item.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {item.id}
                    </TableCell>
                    <TableCell align="center">
                        <AvatarGroup>
                            {item.items.map((orderItem)=><Avatar src={orderItem.food.images[0]} />)}
                        </AvatarGroup>
                    </TableCell>
                    <TableCell align="center">{item.customer?.fullName}</TableCell>
                    <TableCell align="center">{"₹"+item.totalPrice}</TableCell>
                    <TableCell align="center">{item.items.map((orderItem)=><p>{orderItem.food?.name}</p>)}</TableCell>
                    <TableCell align="center">{item.items.map((orderItem)=> <div>
                        {orderItem.ingredients.map((ingredient)=><Chip label={ingredient}/>)}
                    </div>)}</TableCell>
                    <TableCell align="center">{item.orderStatus}</TableCell>
                    <TableCell align='center'>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Update
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {orderStatus.map((status)=>(<MenuItem onClick={()=>handleUpdateOrder(item.id,status.value)}>{status.label}</MenuItem>))}
                            
                        </Menu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
         </TableContainer>
    </Card>
   </Box>
  )
}

export default OrderTable