import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { uploadImageToCloudinary } from '../Util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../Components/State/Menu/Action';
import { getIngredientsOfRestaurant } from '../../Components/State/Ingredients/Action';
import { getRestaurantById, getRestaurantsCategory } from '../../Components/State/Restaurant/Action';
const initialValues={
  name:"",
  description:"",
  price:"",
  categoryId:"",
  restaurantId:"",
  vegetarian:true,
  seasonal:true,
  ingredients:[],
  images:[],
}
const CreateMenuForm = () => {
  const dispatch=useDispatch();
  const {restaurant,ingredients}=useSelector(store=>store)
  const jwt=localStorage.getItem("jwt")
  const [uploadImage,setUploadImage]=useState(false);
  const formik=useFormik({
    initialValues,
    onSubmit: (values) => {
      const payload = {
        ...values,
        restaurantId: restaurant.usersRestaurant.id,
        category: { id: values.categoryId},
      };
      dispatch(createMenuItem({ menu: payload, jwt }));
      console.log("Submit payload -->", payload);
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


   useEffect(() => {
  if (restaurant.usersRestaurant?.id && jwt) {
    dispatch(getRestaurantsCategory({
      jwt,
      restaurantId: restaurant.usersRestaurant.id
    }));

    dispatch(getIngredientsOfRestaurant({
      jwt,
      id: restaurant.usersRestaurant.id
    }));
  }
}, [restaurant.usersRestaurant?.id, jwt, dispatch]);

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl '>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Menu
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
              <Grid item xs={12} sx={{ m: 0, minWidth: 800}}>
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
            <Grid item xs={12}  sx={{ m: 0, minWidth: 800}}>
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
            <Grid item xs={12} lg={6}  sx={{ m: 0, minWidth: 393}}>
                  <TextField 
                  fullWidth
                  id='price'
                  name='price'
                  label='Price'
                  onChange={formik.handleChange}
                  variant='outlined'
                  value={formik.values.price}
                  >

                  </TextField>
            </Grid>
            <Grid item xs={12} lg={6} >
                    <FormControl sx={{ m: 0, minWidth: 393}}>
                        <InputLabel id="demo-select-small-label">Category</InputLabel>
                       <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          name='categoryId'
                          value={formik.values.categoryId}
                          label="Category"
                          onChange={formik.handleChange}
                        >
                          {restaurant.categories?.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                    </FormControl>
            </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 0, width: 800 }}>
                        <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                        <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        name="ingredients"
                        multiple
                        value={formik.values.ingredients}
                        onChange={formik.handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value.id} label={value.name} />
                            ))}
                            </Box>
                        )}
                        // MenuProps={MenuProps}
                        >
                        {ingredients.ingredients?.map((item,index) => (
                            <MenuItem
                            key={item.id}
                            value={item}
                            >
                            {item.name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
             <Grid item xs={12} lg={6}>
                    <FormControl sx={{ m: 0, minWidth: 393 }}>
                        <InputLabel id="demo-select-small-label">Is Vegetarian</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="vegetarian"
                            value={formik.values.vegetarian}
                            label="Is Vegetarian"
                            onChange={formik.handleChange}
                            name="vegetarian"
                        >
                            
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
                    <FormControl sx={{ m: 0, minWidth: 393 }}>
                        <InputLabel id="demo-select-small-label">Is Seasonal</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="seasonal"
                            value={formik.values.seasonal}
                            label="Is Seasonal"
                            onChange={formik.handleChange}
                            name="seasonal"
                        >
                            
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
            </Grid>
            

        
          </Grid>
          <Grid container spacing={2}>
          <Button variant='contained' color='primary' type='submit'>Create Menu Item</Button>

          </Grid>

        </form>
      </div>
    </div>
  )
}

export default CreateMenuForm
