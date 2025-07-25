package com.rukesh.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rukesh.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
	
	public List<Order> findByCustomerId(Long userId);
	
	public List<Order> findByRestaurantId(Long RestaurantId);
	
	
	 @Query("SELECT COUNT(o) FROM Order o WHERE o.createdAt BETWEEN :start AND :end")
	   int countOrdersBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
	
	

}
