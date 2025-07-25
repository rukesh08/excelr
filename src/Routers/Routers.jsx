import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from './AdminRoute'
import CoustomerRoute from './CoustomerRoute'
import AdminDashboard from '../Components/Admin/AdminDashboard'
import Navbar from '../Components/Navbar/Navbar'
import AdminLogout from '../Components/Admin/AdminLogout'


const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/restaurants/*" element={<AdminRoute />} />
        <Route path='/*' element={<CoustomerRoute />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/logout' element={<AdminLogout />} />
      </Routes>
    </div>
  )
}

export default Routers
