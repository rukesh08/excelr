import { Avatar, Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../Pages/assets/logo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = () => {
const navigate=useNavigate();
const {auth,cart}=useSelector(store=>store)

const handleAvatarClick=()=>{
    if(auth.user?.role==="ROLE_CUSTOMER"){
        navigate("/my-profile")
    }
    else if(auth.user?.role==="ROLE_RESTAURANT_OWNER"){
        navigate("/admin/restaurant")
    }else{
        navigate("/partner/home")
    }
}
  return (
    <Box className='px-5 top-0 sticky z-50 py-[.8rem] bg-[#686963] lg:px-20 flex justify-between'>
        
            <div className='lg:mr-10 cursur-pointer flex items-center space-x-4'>
                <img onClick={()=>navigate("/")} src={logo} alt="Logo" className='h-10 cursor-pointer w-auto' />

            </div>
            <div className='flex cursor-pointer  items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <IconButton>
                        <SearchIcon sx={{fontSize:"1.5rem"}} />
                    </IconButton>
                </div>
                <div className=''>
                    {auth.user ? (<Avatar onClick={handleAvatarClick} sx={{color:"white"}}> {auth.user?.fullName[0].toUpperCase()}</Avatar>):
                    (<IconButton onClick={()=>navigate("/account/login")}>
                        <Person />
                    </IconButton>)}
                </div>
                <div className=''>
                    <IconButton onClick={()=>navigate("/cart")}>
                        <Badge color='primary' badgeContent={cart.cart?.items.length}>
                             <ShoppingCartIcon sx={{fontSize:"1.5rem"}} />
                        </Badge>
                    </IconButton>
                </div>

            </div>

        
    </Box>
  )
}

export default Navbar