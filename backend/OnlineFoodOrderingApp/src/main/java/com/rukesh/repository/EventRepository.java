package com.rukesh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rukesh.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
	    List<Event> findByRestaurantId(Long restaurantId);
	}

