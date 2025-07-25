package com.rukesh.contoller;

import com.rukesh.service.AdminDashboardService;
import com.rukesh.service.RestaurantService;
import com.rukesh.service.UserService;
import com.rukesh.dto.AdminDashboardResponse;
import com.rukesh.model.Restaurant;
import com.rukesh.model.User;
import com.rukesh.model.enums.RestaurantStatus;
import com.rukesh.repository.RestaurantRepository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getAdminDashboard(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

     
        AdminDashboardResponse response = adminDashboardService.getDashboardData(user.getRole().name());

        return ResponseEntity.ok(response);
    }


    
    @GetMapping("/user-owned")
    public ResponseEntity<?> getRestaurantByOwner(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        try {
            Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
            return ResponseEntity.ok(restaurant);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Restaurant not found for owner id " + user.getId()));
        }
    }

    
    @GetMapping
    public ResponseEntity<?> getAllRestaurants(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        if (!user.getRole().name().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Access denied. Only admins can view all restaurants."));
        }

        return ResponseEntity.ok(restaurantService.getAllRestaurant());
    }
    

    @PutMapping("/approve-restaurant/{id}")
    public ResponseEntity<String> approveRestaurant(@PathVariable Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        if (restaurant.getStatus() == RestaurantStatus.APPROVED) {
            return ResponseEntity.badRequest().body("Restaurant is already approved.");
        }

        restaurant.setStatus(RestaurantStatus.APPROVED);
        restaurant.setApproved(true);
        restaurantRepository.save(restaurant);

        return ResponseEntity.ok("Restaurant approved successfully.");
    }

    @DeleteMapping("/reject-restaurant/{id}")
    public ResponseEntity<String> rejectRestaurant(@PathVariable Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        if (restaurant.getStatus() == RestaurantStatus.REJECTED) {
            return ResponseEntity.badRequest().body("Restaurant is already rejected.");
        }

        restaurant.setStatus(RestaurantStatus.REJECTED);
        restaurant.setApproved(false);
        restaurantRepository.save(restaurant);

        return ResponseEntity.ok("Restaurant rejected.");
    }
}
