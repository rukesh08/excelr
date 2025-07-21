import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik'
import React from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { uploadImageToCloudinary } from '../Util/UploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../../Components/State/Restaurant/Action';
const initialValues={
  name:"",
  description:"",
  cuisineType:"",
  address:"",
  city:"",
  stateProvince:"",
  postalCode:"",
  country:"",
  email:"",
  mobile:"",
  twitter:"",
  instagram:"",
  openingHours:"Mon-Sun : 9:00 AM - 10:00 PM",
  images:[],
}
const CreateRestaurantForm = () => {
  const [uploadImage,setUploadImage]=useState(false);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const formik=useFormik({
    initialValues,
    onSubmit:(values)=>{
        const data={
          name:values.name,
          description:values.description,
          cuisineType:values.cuisineType,
          address:{
          street:values.address,
          city:values.city,
          state:values.stateProvince,
          postalCode:values.postalCode,
          country:values.country,
          },
          contactInformation:{
            email:values.email,
            mobile:values.mobile,
            twitter:values.twitter,
            instagram:values.instagram
          },
          openingHours:values.openingHours,
          images:values.images,
        };
        console.log("data---",data);

        dispatch(createRestaurant({data,token:jwt}))
    }
  });
  const handleImageChange=async(e)=>{
    const file=e.target.files[0]
    setUploadImage(true)
    const image=await uploadImageToCloudinary(file)
    console.log("image---",image);
    
    formik.setFieldValue("images",[...formik.values.images,image])
    setUploadImage(false)
  }


  const handleRemoveImage=(index)=>{
    const updatedImages=[...formik.values.images]
    updatedImages.splice(index,1)
    formik.setFieldValue("images",updatedImages)
  }
  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl '>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid  item xs={12} >
                <div className='flex flex-wrap gap-5'>
                  <input
                  accept='image/*'
                  id='fileInput'
                  style={{display:"none"}}
                  onChange={handleImageChange}
                  type="file" />
                  <label htmlFor="fileInput" className="relative w-24 h-24 cursor-pointer border rounded-md border-gray-600 flex items-center justify-center">
                    {uploadImage ? (
                      <CircularProgress size={28} className="absolute z-10" />
                    ) : (
                      <AddPhotoAlternateIcon className="text-white z-0" fontSize="large" />
                    )}
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {formik.values.images.map((image,index)=><div key={index} className='relative'>
                      <img className='w-24 h-24 object-cover'  src={image} alt="" />
                      <IconButton size='small' sx={{position:'absolute',top:0,right:0,outline:"none"}} onClick={()=>handleRemoveImage(index)}>
                        <CloseIcon sx={{fontSize:'1rem'}}/>
                      </IconButton>
                      </div>)}
                  </div>
                </div>
            </Grid>
          </Grid>
            <Grid container spacing={2} >
              <Grid item sx={{ minWidth: 897}} xs={12}>
                <TextField
                fullWidth
                id='name'
                name='name'
                label='Name'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.name}
                >
                </TextField>
              </Grid>
              <Grid item sx={{ minWidth: 897}} xs={12}>
                  <TextField 
                  fullWidth
                  id='description'
                  name='description'
                  label='Description'
                  onChange={formik.handleChange}
                  variant='outlined'
                  value={formik.values.description}
                  >

                  </TextField>
              </Grid>
              <Grid item sx={{ minWidth: 440}} xs={12} lg={6}>
                  <TextField 
                  fullWidth
                  id='cuisineType'
                  name='cuisineType'
                  label='Cuisine Type'
                  onChange={formik.handleChange}
                  variant='outlined'
                  value={formik.values.cuisinetype}
                  >

                  </TextField>
              </Grid>
            <Grid item sx={{ minWidth: 440}} xs={12} lg={6}>
                <TextField 
                fullWidth
                id='openingHours'
                name='openingHours'
                label='Opening Hours'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.openingHours}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 897}} xs={12}>
                <TextField 
                fullWidth
                id='streetAddress'
                name='streetAddress'
                label='Street Address'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.streetAddress}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 897}} xs={12}>
                <TextField 
                fullWidth
                id='city'
                name='city'
                label='City'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.city}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 288}} xs={12}>
                <TextField 
                fullWidth
                id='stateProvince'
                name='stateProvince'
                label='State'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.stateProvince}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 288}} xs={12}>
                <TextField 
                fullWidth
                id='postalCode'
                name='postalCode'
                label='Postal Code'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.postalCode}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 288}} xs={12}>
                <TextField 
                fullWidth
                id='country'
                name='country'
                label='Country'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.country}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 440}}  xs={12} lg={6}>
                <TextField 
                fullWidth
                id='email'
                name='email'
                label='Email'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.email}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 440}} xs={12} lg={6}>
                <TextField 
                fullWidth
                id='mobile'
                name='mobile'
                label='Mobile'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.mobile}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 440}} xs={12} lg={6}>
                <TextField 
                fullWidth
                id='instagram'
                name='instagram'
                label='Instagram'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.instagram}
                >
                </TextField>
            </Grid>
            <Grid item sx={{ minWidth: 440}} xs={12} lg={6}>
                <TextField 
                fullWidth
                id='twitter'
                name='twitter'
                label='Twitter'
                onChange={formik.handleChange}
                variant='outlined'
                value={formik.values.twitter}
                >
                </TextField>
            </Grid>
        
          </Grid>
          <Grid container spacing={2}>
          <Button variant='contained' color='primary' type='submit'>Create Restaurant</Button>

          </Grid>

        </form>
      </div>
    </div>
  )
}

export default CreateRestaurantForm
