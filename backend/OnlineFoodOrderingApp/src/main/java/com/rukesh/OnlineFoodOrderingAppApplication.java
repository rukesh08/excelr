package com.rukesh;

import com.rukesh.model.User;
import com.rukesh.model.USER_ROLE;
import com.rukesh.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class OnlineFoodOrderingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineFoodOrderingAppApplication.class, args);
	}

	@Bean
	public CommandLineRunner createDefaultAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByEmail("admin@admin.com") == null) {
				User admin = new User();
				admin.setFullName("Admin");
				admin.setEmail("admin@admin.com");
				admin.setPassword(passwordEncoder.encode("admin123")); // In production, use env variable
				admin.setRole(USER_ROLE.ROLE_ADMIN);
				userRepository.save(admin);
				System.out.println("✅ Default admin created: admin@admin.com / admin123");
			} else {
				System.out.println("ℹ️ Default admin already exists.");
			}
		};
	}
}
