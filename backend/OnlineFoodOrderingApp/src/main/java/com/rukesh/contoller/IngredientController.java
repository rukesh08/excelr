package com.rukesh.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rukesh.model.IngredientCategory;
import com.rukesh.model.IngredientsItem;
import com.rukesh.request.IngredientCategoryResquest;
import com.rukesh.request.IngredientRequest;
import com.rukesh.service.IngredientsService;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {
	
	@Autowired
	private IngredientsService ingredientsService;
	
	@PostMapping("/category")
	public ResponseEntity<IngredientCategory> createIngredientCategory(
			@RequestBody IngredientCategoryResquest req) throws Exception{
		IngredientCategory item=ingredientsService.createIngredientCategory(req.getName(), req.getRestaurantId());
		
		return new ResponseEntity<>(item,HttpStatus.CREATED);
	}
	
	@PostMapping()
	public ResponseEntity<IngredientsItem> createIngredientItem(
			@RequestBody IngredientRequest req) throws Exception{
		IngredientsItem item=ingredientsService.createIngredientItem(req.getRestaurantId(), req.getName(), req.getCategoryId());
		
		return new ResponseEntity<>(item,HttpStatus.CREATED);
	}
	
	
	@PutMapping("/{id}/stoke")
	public ResponseEntity<IngredientsItem> updateIngredientStock(
			@PathVariable Long id) throws Exception{
		IngredientsItem item=ingredientsService.updateStock(id);
		
		return new ResponseEntity<>(item,HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{id}")
	public ResponseEntity<List<IngredientsItem>> getrestaurantIngredient(
			@PathVariable Long id) throws Exception{
		List<IngredientsItem> items=ingredientsService.findRestaurantsIngredients(id);
		
		return new ResponseEntity<>(items,HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{id}/category")
	public ResponseEntity<List<IngredientCategory>> getrestaurantIngredientCategory(
			@PathVariable Long id) throws Exception{
		List<IngredientCategory> items=ingredientsService.findIngredientCategoryByRestaurantId(id);
		
		return new ResponseEntity<>(items,HttpStatus.OK);
	}

}
