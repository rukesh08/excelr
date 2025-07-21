package com.rukesh.model;

public enum USER_ROLE {
	
    ROLE_CUSTOMER,
    ROLE_RESTAURANT_OWNER,
    ROLE_ADMIN,
    ROLE_DELIVERY_PARTNER;
	
	public static USER_ROLE fromString(String value) {
        for (USER_ROLE role : USER_ROLE.values()) {
            if (role.name().equalsIgnoreCase(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + value);
    }
    
    
    
}

