import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from './AdminRoute'
import CoustomerRoute from './CoustomerRoute'

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/restaurants/*" element={<AdminRoute />} />
        <Route path='/*' element={<CoustomerRoute />} />
      </Routes>
    </div>
  )
}

export default Routers
