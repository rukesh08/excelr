import { Grid } from '@mui/material'
import React from 'react'
import MenuTable from '../Menu/MenuTable'
import OrderTable from '../Orders/OrderTable'
import EventsTable from '../Events/EventsTable'

const RestaurantDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{minWidth:856}} lg={6}>
          <MenuTable />
        </Grid>
        <Grid item xs={12} sx={{minWidth:400}} lg={6}>
          <OrderTable />
        </Grid>
        <Grid item xs={12} sx={{minWidth:400}} lg={6}>
          <EventsTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default RestaurantDashboard