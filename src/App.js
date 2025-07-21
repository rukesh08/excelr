import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from './Theme/DarkTheme';
import Home from './Components/Home/Home';
import RestaurantDetails from './Components/Restaurant/RestaurantDetails';
import Cart from './Components/Cart/Cart';
import Profile from './Components/Profile/Profile';
import CoustomerRoute from './Routers/CoustomerRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Components/State/Authentication/Action';
import { findCart } from './Components/State/Cart/Action';
import Routers from './Routers/Routers';
import { getRestaurantByUserId } from './Components/State/Restaurant/Action';

function App() {

  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)
  useEffect(()=>{
      dispatch(getUser(auth.jwt || jwt));
      dispatch(findCart(jwt))
  },[auth.jwt]);

  useEffect(()=>{
    dispatch(getRestaurantByUserId(auth.jwt || jwt))
  },[auth.user])
  return (
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
     
      <Routers />
    </ThemeProvider>
  );
}

export default App;
