package com.rukesh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rukesh.model.Food;

public interface FoodRespository extends JpaRepository<Food, Long> {
	
	List<Food> findByRestaurantId(Long restaurantId);
	
	@Query("SELECT f FROM Food f WHERE f.name LIKE %:keyword% OR f.foodCategory.name LIKE %:keyword%")
	List<Food> searchFood(@Param("keyword") String keyword);
	
	

}
