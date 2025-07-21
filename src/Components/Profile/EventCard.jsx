import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = ({event}) => {
  return (
    <Card sx={{width:345}}>
        <CardMedia 
        sx={{height:255}}
        image={event.image}
        />
        <CardContent>
            <Typography variant='h5'>
                {event.name}
            </Typography>
            <Typography variant='body2'>
                50% off on your first order
            </Typography>
            <div className='py-2 space-y-2'>
                <p>{event.location}</p>
                <p className='text-sm text-blue-500'>
                    {new Date(event.startedAt).toLocaleString()}
                </p>
                <p className='text-sm text-red-500'>
                    {new Date(event.endsAt).toLocaleString()}
                </p>
                
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