import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { registerUser, registerUserGoogle } from '../State/Authentication/Action';
import { useEffect } from 'react'; 
import { jwtDecode } from 'jwt-decode';

const GOOGLE_CLIENT_ID = "597844623024-o3i89jeng839ha57d2iq206fp51ejme4.apps.googleusercontent.com";
const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (values) => {
        console.log("Submitting user data:", values);
        dispatch(registerUser({userData:values,navigate}))
        console.log("form values", values);
    };

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    useEffect(() => {
        window.google?.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback
        });

        window.google?.accounts.id.renderButton(
            document.getElementById("google-signup"),
            { theme: "outline", size: "large", width: "100%" }
        );
    }, []);

       const handleGoogleCallback = (response) => {
  const decoded = jwtDecode(response.credential);
  const userData = {
    fullName: decoded.name,
    email: decoded.email,
    password: decoded.sub,
    role: "ROLE_CUSTOMER",
  };
  dispatch(registerUserGoogle({ userData, navigate }));
};

    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Register
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                {({ values, handleChange, setFieldValue }) => (
                    <Form>
                        <TextField
                            name="fullName"
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={values.fullName}
                            onChange={handleChange}
                        />
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
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={values.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="role"
                                value={values.role}
                                label="Role"
                                onChange={(e) => setFieldValue("role", e.target.value)}
                            >
                                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                                <MenuItem value={"ROLE_DELIVERY_PARTNER"}>Delivery Partner</MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>

             <div style={{ margin: '1rem 0' }}>
                <div id="google-signup" style={{ display: 'flex', justifyContent: 'center' }}></div>
            </div>

            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Already have an account?
                <Button size='small' onClick={() => navigate("/account/login")}>
                    Login
                </Button>
            </Typography>
        </div>
    );
};

export default RegisterForm;
