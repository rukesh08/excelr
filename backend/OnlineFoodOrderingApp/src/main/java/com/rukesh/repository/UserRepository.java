package com.rukesh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rukesh.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	public User findByEmail(String username);

	

	
	
}
