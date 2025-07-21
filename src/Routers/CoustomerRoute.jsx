import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Navbar from '../Components/Navbar/Navbar'
import RestaurantDetails from '../Components/Restaurant/RestaurantDetails'
import Cart from '../Components/Cart/Cart'
import Profile from '../Components/Profile/Profile'
import Auth from '../Components/Auth/Auth'
import PartnerHome from '../Components/Delivery/PartnerHome'
import PaymentSuccess from '../Components/PaymenytSuccess/PaymentSuccess'

const CoustomerRoute = () => {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/account/:register' element={<Home />}/>
            <Route path='/account/:login' element={<Home />}/>
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/my-profile/*' element={<Profile />}/>
            <Route path="/partner/home" element={<PartnerHome />} />
            <Route path="/payment/success/:id" element={<PaymentSuccess />} />

        </Routes>
        <Auth />
    </div>
  )
}

export default CoustomerRoute