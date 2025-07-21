import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  IconButton
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { deleteEventAction } from '../../Components/State/Restaurant/Action';
import { useEffect } from 'react';
import { getRestaurantsEvents } from '../../Components/State/Restaurant/Action';

dayjs.extend(utc);
dayjs.extend(timezone);

const EventsTable = () => {
    
  const {resturant,usersRestaurant, restaurantsEvents } = useSelector((store) => store.restaurant);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { user } = useSelector((store) => store.auth);
  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEventAction({ eventId, jwt }));
    }
  };

 console.log("User Info:", user);
 console.log("Restaurant ID from user:", user?.restaurant?.id);
  useEffect(() => {
  console.log("Fetched Events:", restaurantsEvents);
}, [restaurantsEvents]);

   useEffect(() => {
  if (usersRestaurant?.id) {
    dispatch(getRestaurantsEvents({ restaurantId: usersRestaurant.id, jwt }));
  }
}, [dispatch, usersRestaurant?.id, jwt]);


  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Your Events
      </Typography>

      {restaurantsEvents.length === 0 ? (
        <Typography>No events found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="events table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Event Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Starts At</TableCell>
                <TableCell>Ends At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantsEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={event.image}
                      alt={event.name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{dayjs(event.startedAt).tz('Asia/Kolkata').format('MMM D, YYYY h:mm A')}</TableCell>
                  <TableCell>{dayjs(event.endsAt).tz('Asia/Kolkata').format('MMM D, YYYY h:mm A')}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleDelete(event.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EventsTable;
