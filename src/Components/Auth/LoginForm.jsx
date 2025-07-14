import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { loginUser } from '../State/Authentication/Action';

const initialValues = {
    email: "",
    password: ""
}

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (values) => {
        dispatch(loginUser({userData:values,navigate}))
        console.log("Login form submitted:", values);
    };

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Login
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                {({ handleChange, values }) => (
                    <Form>
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={values.email}
                            onChange={handleChange}
                        />

                        <TextField
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Don't have an account?
                <Button size='small' onClick={() => navigate("/account/register")}>
                    Register
                </Button>
            </Typography>
        </div>
    )
}

export default LoginForm
