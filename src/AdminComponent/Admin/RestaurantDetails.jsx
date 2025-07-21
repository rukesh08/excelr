import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../Components/State/Restaurant/Action';
import { useEffect } from 'react';


const RestaurantDetails = () => {
  const dispatch = useDispatch();

  const {restaurant} = useSelector((store) => store);
  useEffect(() => {
  if (restaurant && restaurant.usersRestaurant) {
    console.log("Current restaurant status in component:", restaurant.usersRestaurant.open);
  }
}, [restaurant.usersRestaurant?.id, restaurant.usersRestaurant?.open]);
  
 const handleToggle = () => {
  const restaurantId = restaurant.usersRestaurant?.id;
  const currentStatus = restaurant.usersRestaurant?.open;
  const jwt = localStorage.getItem('jwt');

  if (!restaurantId || !jwt) {
    console.warn('Missing restaurantId or jwt');
    return;
  }
  console.log('Toggling status, current isOpen:', currentStatus);

  dispatch(updateRestaurantStatus({ restaurantId, jwt, newStatus: !currentStatus }));
};

 

  
  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>{restaurant.usersRestaurant?.name}</h1>
        <div>
          <Button
        variant="contained"
        color={!restaurant.usersRestaurant?.open ? "error" : "primary"}
        onClick={() => {
            console.log("Current open status before dispatch:", restaurant.usersRestaurant?.open);
            handleToggle();
          }}
        size="large"
      >
        {restaurant.usersRestaurant?.open ? "Close" : "Open"}
      </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ m: 0, width: 1080 }}>
          <Card >
            <CardHeader title={<span className='text-gray-300'>Restaurant</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                  <div className='flex'>
                    <p className='w-48'>Owner</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.owner?.fullName}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>Restaurant Name</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.name}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>Cuisine Type</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.cuisineType}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>Opening Hours</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.openingHours}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>Status</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                     {restaurant.usersRestaurant?.open ?<span className='px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open</span>:<span className='px-5 py-2 rounded-full bg-red-400 text-gray-950'>Closed</span>}
                    </p>
                  </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ m: 0, width: 520 }} lg={6}>
          <Card >
            <CardHeader title={<span className='text-gray-300'>Address</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                  <div className='flex'>
                    <p className='w-48'>Country</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.address?.country}
                      
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>City</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.address?.city}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>Postal Code</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.address?.postalCode}
                      
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>Street Address</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.address?.street}
                      
                    </p>
                  </div>
                  
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ m: 0, width: 520 }} lg={6}>
          <Card >
            <CardHeader title={<span className='text-gray-300'>Contact</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                  <div className='flex'>
                    <p className='w-48'>Email</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.contactInformation?.email}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>Mobile</p>
                    <p className='text-gray-400'>
                      <span className='pr-5'>-</span>
                      {restaurant.usersRestaurant?.contactInformation?.mobile}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-48'>Social</p>
                    <div className='flex text-gray-400 items-center pb-3 gap-2'>
                      <span className='pr-5'>-</span>
                      <a href={restaurant.usersRestaurant?.contactInformation?.instagram}>
                      <InstagramIcon sx={{fontSize:"3rem"}} />
                      </a>
                      <a href={restaurant.usersRestaurant?.contactInformation?.twitter}>
                      <TwitterIcon sx={{fontSize:"3rem"}} />
                      </a>
                      <a href="/">
                      <LinkedInIcon sx={{fontSize:"3rem"}} />
                      </a>
                      <a href="/">
                      <FacebookIcon sx={{fontSize:"3rem"}} />
                      </a>
                    </div>

                  </div>
                  
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default RestaurantDetails
