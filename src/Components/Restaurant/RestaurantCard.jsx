import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../Config/Logic';

const RestaurantCard = ({item}) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)
  const { restaurant } = useSelector(store => store.restaurant);
  const handleAddToFavorite=()=>{
    dispatch(addToFavorite({restaurantId:item.id,jwt}))
  }
    const handleNavigateToRestaurant = () => {
    const city = restaurant?.address?.city || 'unknown';
    if (item.open) {
      navigate(`/restaurant/${city}/${item.name}/${item.id}`);
    }
  };

  return (
    <Card
      className={`w-[18rem] ${item.open ? 'cursor-pointer' : 'cursor-not-allowed opacity-60 pointer-events-none'}`}
    >
      <div className="relative">
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images[0]}
          alt=""
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? 'success' : 'error'}
          label={item.open ? 'open' : 'closed'}
        />
      </div>

      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p
            onClick={item.open ? handleNavigateToRestaurant : undefined}
            className="font-semibold text-lg"
          >
            {item.name}
          </p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <div>
          <IconButton
            onClick={item.open ? handleAddToFavorite : undefined}
            disabled={!item.open}
          >
            {isPresentInFavorites(auth.favorites, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>

  )
}

export default RestaurantCard