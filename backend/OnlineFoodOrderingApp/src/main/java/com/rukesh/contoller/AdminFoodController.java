package com.rukesh.contoller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rukesh.model.Category;
import com.rukesh.model.Food;
import com.rukesh.model.Restaurant;
import com.rukesh.model.User;
import com.rukesh.request.CreateFoodRequest;
import com.rukesh.response.MessageResponse;
import com.rukesh.service.CategoryService;
import com.rukesh.service.FoodService;
import com.rukesh.service.RestaurantService;
import com.rukesh.service.UserService;

@RestController
@RequestMapping("/api/admin/food")

public class AdminFoodController {
	
	@Autowired
	private FoodService foodService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RestaurantService restaurantService;
	
	 @Autowired
	 private CategoryService categoryService;
	
	 @PostMapping
	    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
	        User user = userService.findUserByJwtToken(jwt);
	        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());

	        // Load Category entity from DB using categoryId from DTO
	        Category category = categoryService.findCategoryById(req.getCategoryId());
	        Food food = foodService.createFood(req, category, restaurant);

	        return new ResponseEntity<>(food, HttpStatus.CREATED);
	    }
	
	
	@DeleteMapping("{id}")
	public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id,@RequestHeader("Authorization") String jwt) throws Exception{
		User user=userService.findUserByJwtToken(jwt);
		
		foodService.deleteFood(id);
		
		MessageResponse res=new MessageResponse();
		res.setMessage("food deleted successfully");
		
		return new ResponseEntity<>(res,HttpStatus.CREATED);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long id,@RequestHeader("Authorization") String jwt) throws Exception{
		User user=userService.findUserByJwtToken(jwt);
		
		Food food=foodService.updateAvailabilityStatus(id);
		
		
		
		return new ResponseEntity<>(food,HttpStatus.CREATED);
	}

}
