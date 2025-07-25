package com.rukesh.service;

import java.util.List;

import com.rukesh.dto.RestaurantDto;
import com.rukesh.model.Restaurant;
import com.rukesh.model.User;
import com.rukesh.request.CreateRestaurantRequest;

public interface RestaurantService {

    Restaurant createRestaurant(CreateRestaurantRequest req, User user);

    Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception;

    void deleteRestaurant(Long restaurantId) throws Exception;

    List<Restaurant> getAllRestaurant();

    List<Restaurant> searchRestaurant(String keyword);

    Restaurant findRestaurantById(Long id) throws Exception;

    Restaurant getRestaurantByUserId(Long userId) throws Exception;

    RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception;

    Restaurant updaterestaurantStatus(Long id, boolean open) throws Exception;

    
    void approveRestaurant(Long restaurantId) throws Exception;

    void rejectRestaurant(Long restaurantId) throws Exception;
}
