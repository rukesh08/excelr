import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

const AddressCard = ({item,showButton,handleSelectAddress}) => {
  
  return (
    <Card className="w-full max-w-xs p-4 bg-[#1e1e1e] text-white flex flex-col justify-between">
        <div className='flex items-start gap-3'>
          <HomeIcon />
          <div className='space-y-2 text-gray-500'>
            <h1 className='font-semibold text-lg text-white'>
              Home
            </h1>
            <p >
              Kukatpally 2nd Phase, Allwyn Colony, Kukatp,500018,Hyderabad,India
            </p>
            {showButton && (<Button variant='outlined' fullWidth onClick={()=>handleSelectAddress(item)}>select</Button>)}
          </div>
        </div> 
    </Card>
  )
}

export default AddressCard