import React from 'react'
import { Box, Button, Grid, Modal, TextField} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../Components/State/Restaurant/Action';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialValues={
    image:"",
    location:"",
    name:"",
    startedAt:null,
    endsAt:null,
  }

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues,setFormValues]=React.useState(initialValues)
  const handleFormChange=(e)=>{
    setFormValues({...formValues,[e.target.name]:e.target.value})
  }
  const handleDateChange=(date,dataType)=>{
    setFormValues({...formValues,[dataType]:date})
  }
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {restaurant} = useSelector((store) => store);

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("submit",formValues);
    dispatch(createEventAction({data:formValues,restaurantId:restaurant.usersRestaurant?.id,jwt}))
    setFormValues(initialValues);
    
  }

  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>Create New Event</Button>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container  spacing={3}>
              <Grid item  xs={12}>
                <TextField
                name="image"
                label="Image URL"
                variant='outlined'
                value={formValues.image}
                onChange={handleFormChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                name="location"
                label="Location"
                variant='outlined'
                value={formValues.location}
                onChange={handleFormChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                name="name"
                label="Event Name"
                variant='outlined'
                value={formValues.name}
                onChange={handleFormChange}

                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) => handleDateChange(newValue, "startedAt")}
                    slotProps={{
                      popper: {
                        modifiers: [
                          { name: 'offset', options: { offset: [0, -10] } },
                          { name: 'preventOverflow', options: { altAxis: true } },
                          { name: 'flip', options: { fallbackPlacements: ['top'] } },
                        ],
                        placement: 'top-start',
                      },
                      textField: { fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DateTimePicker
                    label="End Date and Time"
                    value={formValues.endsAt}
                    onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                    slotProps={{
                      popper: {
                        modifiers: [
                          { name: 'offset', options: { offset: [0, -10] } },
                          { name: 'preventOverflow', options: { altAxis: true } },
                          { name: 'flip', options: { fallbackPlacements: ['top'] } },
                        ],
                        placement: 'top-start',
                      },
                      textField: { fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button variant='contained' color='primary' type='submit'>
                  Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      </div>

    </div>
  )
}

export default Events