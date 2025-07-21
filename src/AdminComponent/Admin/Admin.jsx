import React from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Orders from '../Orders/Orders'
import Menu from '../Menu/Menu'
import FoodCategory from '../FoodCategory/FoodCategory'
import Events from '../Events/Events'
import RestaurantDetails from './RestaurantDetails'
import Ingredients from '../Ingredients/Ingredients'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRestaurantById, getRestaurantsCategory } from '../../Components/State/Restaurant/Action'
import { getMenuItemsByRestaurantId } from '../../Components/State/Menu/Action'
import { fetchRestaurantsOrder } from '../../Components/State/RestaurantOrder/Action'

const Admin = () => {
   const dispatch = useDispatch();
    const jwt=localStorage.getItem("jwt")
    const {restaurant}=useSelector(store=>store)
    const handleClose=()=>{
    }
    useEffect(() => {
    if (restaurant.usersRetaurant?.id && jwt) {
        dispatch(getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant.id
        }));

        dispatch(fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurant.id
        }));
    }
}, [restaurant.usersRetaurant?.id, jwt]);
  return (
    <div>
        <div className='lg:flex justify-between'>
            <div >
                <AdminSideBar handleClose={handleClose}/>
            </div>
            <div className='lg:w-[80%]'>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/menu' element={<Menu />} />
                    <Route path='/category' element={<FoodCategory />} />
                    <Route path='/ingredients' element={<Ingredients />} />
                    <Route path='/event' element={<Events />} />
                    <Route path='/details' element={<RestaurantDetails />} />
                    <Route path='/add-menu' element={<CreateMenuForm />} />
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default Admin