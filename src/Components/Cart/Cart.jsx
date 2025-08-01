import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:'none',
  boxShadow: 24,
  p:4
};

const initialValues={
    streetAddress:"",
    state:"",
    pincode:'',
    city:""
}
const addressList = [
  {
    streetAddress: "123 MG Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001"
  },
  {
    streetAddress: "456 JP Nagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560078"
  }
];

const items=[1,1]

export const Cart = () => {
    const createOrderUsingSeletedAddress = (address) => {
    const jwt = localStorage.getItem("jwt");
    const restaurantId = cart?.cartItems?.[0]?.food?.restaurant?.id;

    if (!restaurantId) {
        alert("Unable to place order: Restaurant ID missing.");
        return;
    }

    const data = {
        jwt,
        order: {
        restaurantId,
        deliveryAddress: {
            fullName: auth.user?.fullName,
            streetAddress: address.streetAddress,
            city: address.city,
            state: address.state,
            postalCode: address.pincode,
            country: "India"
        }
        }
    };

    console.log("Order from selected address:", data);
    dispatch(createOrder(data));
    };

    const dispatch=useDispatch();
    
    const {cart,auth} =useSelector(store=>store)
    const handleOpenAddressModel=()=>setOpen(true)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleSubmit = (values) => {
  const jwt = localStorage.getItem("jwt");
  const restaurantId = cart?.cartItems?.[0]?.food?.restaurant?.id;

  if (!restaurantId) {
    alert("Unable to place order: Your cart is Empty.");
    return;
  }

  const data = {
    jwt,
    order: {
      restaurantId,
      deliveryAddress: {
        fullName: auth.user?.fullName,
        streetAddress: values.streetAddress,
        city: values.city,
        state: values.state,
        postalCode: values.pincode,
        country: "India"
      }
    }
  };
  console.log("Sending order payload:", data);
  dispatch(createOrder(data));

};

  return (
    <>
        <main className='lg:flex justify-between'>
            <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
              {cart.cartItems.map((item)=>(  <CartItem  item={item}/>))}
            <Divider />
            <div className='billDetails px-5 text-sm'>
                <p className='font-extralight py-5'>Bill Details  </p>
                <div className='space-y-3'>
                    <div className='flex justify-between text-gray-300'>
                        <p>Item Total</p>
                        <p>₹{cart.cart.total}</p>
                    </div>
                    
                        {cart.cartItems && cart.cartItems.length > 0 && (
                            <>
                                <div className='flex justify-between text-gray-300'>
                                <p>Delivery Fee</p>
                                <p>₹29</p>
                                </div>
                                <div className='flex justify-between text-gray-300'>
                                <p>GST & Other Charges</p>
                                <p>₹33</p>
                                </div>
                                <Divider />
                                <div className='flex justify-between text-gray-300'>
                                <p>TO PAY</p>
                                <p>₹{cart.cart.total + 29 + 33}</p>
                                </div>
                            </>
                            )}
                    </div>
            </div>
            </section>
            <Divider orientation='vertical' flexItem/>
            <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                <div>
                    <h1 className='text-center font-semibold text-2xl py-10'>
                        Choose your delivery address
                    </h1>
                    <div className='flex gap-5 flex-wrap justify-center'>
                        {addressList.map((item) => (
                            <AddressCard handleSelectAddress={() => createOrderUsingSeletedAddress(item)} item={item} showButton={true} />
                        ))}


                        <Card className="w-full max-w-xs p-4 bg-[#1e1e1e] text-white flex flex-col justify-between">
                            <div className='flex items-start gap-3'>
                            <AddLocationAltIcon />
                            <div className='space-y-2 text-gray-500'>
                                <h1 className='font-semibold text-lg text-white'>
                                Add New Address
                                </h1>
                                
                               <Button variant='outlined' fullWidth onClick={handleOpenAddressModel}>Add</Button>
                            </div>
                            </div> 
                        </Card>
                    </div>
                </div>
            </section>
        </main>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Formik initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                as={TextField}
                                name="streetAddress"
                                label="Street Address"
                                fullWidth
                                variant="outlined"
                                // error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                as={TextField}
                                name="state"
                                label="State"
                                fullWidth
                                variant="outlined"
                                // error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                as={TextField}
                                name="city"
                                label="City"
                                fullWidth
                                variant="outlined"
                                // error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                as={TextField}
                                name="pincode"
                                label="Pincode"
                                fullWidth
                                variant="outlined"
                                // error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant='contained' type='submit' color='primary'>Deliver Here</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Modal>
    </>
  )
}

export default Cart;