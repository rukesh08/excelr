import { Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../State/Authentication/Action';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../Navbar/Navbar';

const AdminLogout = () => {

const user = useSelector((state) => state.auth.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

   const handleLogout = () => {
            dispatch(logout());
            navigate("/")
        }
  
  return (
    <div>
        <Navbar />
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
                <div className='flex flex-col items-center justify-center'>
                    <AccountCircleIcon sx={{ fontSize: "9rem" }} />
                    <h1 className='py-5 text-2xl font-semibold'>{user?.name}</h1>
                    <p>Email: {user?.email}</p>
                    <Button variant='contained' onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>Logout</Button>
                </div>
            </div>
    </div>
  )
}

export default AdminLogout