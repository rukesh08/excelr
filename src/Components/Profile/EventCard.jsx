import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <Card sx={{width:345}}>
        <CardMedia 
        sx={{height:255}}
        image='https://cdn.pixabay.com/photo/2022/07/15/18/12/cheese-burger-7323672_1280.jpg'
        />
        <CardContent>
            <Typography variant='h5'>
                Burger King 
            </Typography>
            <Typography variant='body2'>
                50% off on your first order
            </Typography>
            <div className='py-2 space-y-2'>
                <p>{"Hyderabad"}</p>
                <p className='text-sm text-blue-500'>July 27,2025 12:00 AM</p>
                <p className='text-sm text-red-500'>July 28,2025 12:00 AM</p>
                
            </div>
        </CardContent>
        {false && <CardActions>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </CardActions>}
    </Card>
  )
}

export default EventCard