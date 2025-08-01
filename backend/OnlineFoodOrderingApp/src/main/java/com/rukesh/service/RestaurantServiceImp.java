package com.rukesh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rukesh.dto.RestaurantDto;
import com.rukesh.model.Address;
import com.rukesh.model.Restaurant;
import com.rukesh.model.User;
import com.rukesh.model.enums.RestaurantStatus;
import com.rukesh.repository.AddressRepository;
import com.rukesh.repository.RestaurantRepository;
import com.rukesh.repository.UserRepository;
import com.rukesh.request.CreateRestaurantRequest;

@Service
public class RestaurantServiceImp implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {
        if (req.getAddress() == null) {
            throw new IllegalArgumentException("Address in CreateRestaurantRequest cannot be null");
        }
        Address address = addressRepository.save(req.getAddress());

        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);
        restaurant.setOpen(req.isOpen());
        restaurant.setStatus(RestaurantStatus.PENDING);  // Newly created restaurant usually PENDING
        restaurant.setApproved(false);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        if (updatedRestaurant.getCuisineType() != null) {
            restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        }

        if (updatedRestaurant.getDescription() != null) {
            restaurant.setDescription(updatedRestaurant.getDescription());
        }

        if (updatedRestaurant.getName() != null) {
            restaurant.setName(updatedRestaurant.getName());
        }

        if (updatedRestaurant.getImages() != null) {
            restaurant.setImages(updatedRestaurant.getImages());
        }

        if (updatedRestaurant.getOpeningHours() != null) {
            restaurant.setOpeningHours(updatedRestaurant.getOpeningHours());
        }

      

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt = restaurantRepository.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Restaurant not found with id " + id);
        }
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant = restaurantRepository.findByOwnerId(userId);
        if (restaurant == null) {
            throw new Exception("Restaurant not found with owner id " + userId);
        }
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDto dto = new RestaurantDto();
        dto.setId(restaurant.getId());
        dto.setName(restaurant.getName());
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setOpen(restaurant.isOpen());
        dto.setCity(restaurant.getAddress().getCity());

        boolean isFavorited = false;
        List<RestaurantDto> favorites = user.getFavorites();

        for (RestaurantDto favorite : favorites) {
            if (favorite.getId().equals(restaurantId)) {
                isFavorited = true;
                break;
            }
        }

        if (isFavorited) {
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        } else {
            favorites.add(dto);
        }

        userRepository.save(user);
        return dto;
    }

    @Override
    public Restaurant updaterestaurantStatus(Long id, boolean open) throws Exception {
        Restaurant restaurant = findRestaurantById(id);
        restaurant.setOpen(open);
        return restaurantRepository.save(restaurant);
    }

   

    @Override
    public void approveRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurant.setStatus(RestaurantStatus.APPROVED);
        restaurant.setApproved(true);
        restaurantRepository.save(restaurant);
    }

    @Override
    public void rejectRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurant.setStatus(RestaurantStatus.REJECTED);
        restaurant.setApproved(false);
        restaurantRepository.save(restaurant);
    }
}
