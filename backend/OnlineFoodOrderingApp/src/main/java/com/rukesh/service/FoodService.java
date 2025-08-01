package com.rukesh.service;

import java.util.List;

import com.rukesh.model.Category;
import com.rukesh.model.Food;
import com.rukesh.model.Restaurant;
import com.rukesh.request.CreateFoodRequest;

public interface FoodService {
	
	public Food createFood(CreateFoodRequest req,Category category,Restaurant restaurant);
	
	void deleteFood(Long foodId) throws Exception;
	
	public List<Food> getRestaurantsFood(Long restaurantId,boolean isVegetarain,boolean isNonveg,boolean isSeasonal,String foodCategory);
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId)throws Exception;
	
	public Food updateAvailabilityStatus(Long foodId)throws Exception;
	
	

}
