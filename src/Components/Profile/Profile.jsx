import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './UserProfile'
import Orders from './Orders'
import Address from './Address'
import Favorites from './Favorites'
import Events from './Events'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { auth } = useSelector((store) => store);
      console.log(auth);
    const [openSideBar,setOpenSideBar]=useState(false)
  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-[80vh] lg:w-[20%]'>
            <ProfileNavigation open={openSideBar}/>
      </div>
      <div className='lg:w-[80%]'>
         <Routes>
            <Route path='/' element={<UserProfile />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/address' element={<Address addresses={auth.user?.addresses || []} />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/events' element={<Events />} /> 

         </Routes>
      </div>
    </div>
  )
}

export default Profile
