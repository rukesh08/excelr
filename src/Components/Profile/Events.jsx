import React, { useEffect } from 'react';
import EventCard from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../Components/State/Restaurant/Action';

const Events = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((store) => store.restaurant); // Adjust based on your reducer
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllEvents({ jwt }));
  }, [dispatch]);

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {events?.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default Events;
