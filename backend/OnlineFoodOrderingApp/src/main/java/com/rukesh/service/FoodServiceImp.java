package com.rukesh.service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rukesh.model.Category;
import com.rukesh.model.Food;
import com.rukesh.model.Restaurant;
import com.rukesh.repository.FoodRespository;
import com.rukesh.request.CreateFoodRequest;

@Service
public class FoodServiceImp implements FoodService {
	
	@Autowired
	private FoodRespository foodRespository;

	@Override
	public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {
		Food food=new Food();
		food.setFoodCategory(category);
		food.setRestaurant(restaurant);
		food.setDescription(req.getDescription());
		food.setImages(req.getImages());
		food.setName(req.getName());
		food.setPrice(req.getPrice());
		food.setIngredients(req.getIngredients());
		food.setSeasonal(req.isSeasonal());
		food.setVegetarian(req.isVegetarian());
		food.setCreationDate(LocalDateTime.now());
		Food savedFood= foodRespository.save(food);
		restaurant.getFoods().add(savedFood);
		
				
		return savedFood;
	}

	@Override
	public void deleteFood(Long foodId) throws Exception {
		Food food=findFoodById(foodId);
		food.setRestaurant(null);
		foodRespository.save(food);
		
		
	}

	@Override
	public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarain, boolean isNonveg, boolean isSeasonal,
			String foodCategory) {
		List<Food> foods=foodRespository.findByRestaurantId(restaurantId);
		
		if(isVegetarain) {
			foods=filterByVegetarian(foods,isVegetarain);
		}
		if(isNonveg) {
			foods=filterByNonveg(foods,isNonveg);
		}
		if(isSeasonal) {
			foods=filterBySeasonal(foods,isSeasonal);
		}
		if(foodCategory!=null && !foodCategory.equals("")) {
			foods=filterByCategory(foods,foodCategory);
		}
		
		return foods;
	}
	
	private List<Food> filterByCategory(List<Food> foods,String foodCategory){
		return foods.stream().filter(food ->{
			if(food.getFoodCategory()!=null) {
				return food.getFoodCategory().getName().equals(foodCategory);
			}
			return false;
		}).collect(Collectors.toList());
	}
	
	private List<Food> filterBySeasonal(List<Food> foods,boolean isSeasonal){
			
			return foods.stream().filter(food -> food.isSeasonal()==isSeasonal).collect(Collectors.toList());
		}
	
	private List<Food> filterByNonveg(List<Food> foods,boolean isNonveg){
			
			return foods.stream().filter(food -> food.isVegetarian()==false).collect(Collectors.toList());
		}
	
	private List<Food> filterByVegetarian(List<Food> foods,boolean isVegetarian){
			
			return foods.stream().filter(food -> food.isVegetarian()==isVegetarian).collect(Collectors.toList());
		}

	@Override
	public List<Food> searchFood(String keyword) {
		
		return foodRespository.searchFood(keyword);
	}

	@Override
	public Food findFoodById(Long foodId) throws Exception {
		Optional<Food> optionalFood=foodRespository.findById(foodId);
		if(optionalFood.isEmpty()) {
			throw new Exception("food not exist...");
		}
		return optionalFood.get();
	}

	@Override
	public Food updateAvailabilityStatus(Long foodId) throws Exception {
		Food food=findFoodById(foodId);
		food.setAvailable(!food.isAvailable());
		return foodRespository.save(food);
	}
	
	

}
