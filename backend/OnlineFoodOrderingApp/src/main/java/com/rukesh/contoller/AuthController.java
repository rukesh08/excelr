package com.rukesh.contoller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rukesh.config.JwtProvider;
import com.rukesh.model.Cart;
import com.rukesh.model.USER_ROLE;
import com.rukesh.model.User;
import com.rukesh.repository.CartRepository;
import com.rukesh.repository.UserRepository;
import com.rukesh.request.LoginRequest;
import com.rukesh.response.AuthResponse;
import com.rukesh.service.CustomerUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {
        // 1) check email
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new Exception("Email is already used with another account");
        }

        // 2) build user
        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());

        // 3) Assign default role if not provided
        USER_ROLE assignedRole = USER_ROLE.ROLE_CUSTOMER;
        try {
            if (user.getRole() != null) {
                assignedRole = USER_ROLE.valueOf(user.getRole().name()); // Safe assignment
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid role received, defaulting to ROLE_CUSTOMER");
        }
        createdUser.setRole(assignedRole);

        // 4) Encode password
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(createdUser);

        // 5) Create empty cart
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

        // 6) Generate JWT - authenticate user with raw password
        Authentication authentication = authenticate(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);

        // 7) Prepare response
        AuthResponse resp = new AuthResponse();
        resp.setJwt(jwt);
        resp.setMessage("Register success");
        resp.setRole(savedUser.getRole());

        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) {
        Authentication authentication = authenticate(req.getEmail(), req.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);

        Collection<? extends GrantedAuthority> auths = authentication.getAuthorities();
        String role = auths.isEmpty() ? null : auths.iterator().next().getAuthority();

        AuthResponse resp = new AuthResponse();
        resp.setJwt(jwt);
        resp.setMessage("Login success");
        resp.setRole(USER_ROLE.valueOf(role));

        return ResponseEntity.ok(resp);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleAuthHandler(@RequestBody User user) throws Exception {
        // Check if user exists by email
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            // New Google user: create user record
            User newUser = new User();
            newUser.setEmail(user.getEmail());
            newUser.setFullName(user.getFullName());
            newUser.setRole(USER_ROLE.ROLE_CUSTOMER);

            // Use Google sub (sent as password) hashed
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));

            User savedUser = userRepository.save(newUser);

            // Create empty cart
            Cart cart = new Cart();
            cart.setCustomer(savedUser);
            cartRepository.save(cart);

            existingUser = savedUser;
        }

        // Authenticate user with email and Google sub as password
        Authentication authentication = authenticate(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse resp = new AuthResponse();
        resp.setJwt(jwt);
        resp.setMessage("Login success via Google");
        resp.setRole(existingUser.getRole());

        return ResponseEntity.ok(resp);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(username);
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(
            userDetails,
            null,
            userDetails.getAuthorities()
        );
    }
}
