import { Grid } from '@mui/material'
import React from 'react'
import IngredientTable from './Ingredienttable'
import IngredientCategoryTable from './IngredientCategoryTable'


export default function Ingredients () {
  return (
    <div className='px-2'>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <IngredientTable />
        </Grid>
        <Grid item xs={12} sx={{ m: 0, width: 500 }} lg={4}>
          <IngredientCategoryTable />
        </Grid>
      </Grid>
    </div>
  )
}


