
package com.rukesh.dto;

public class PendingRestaurantDTO {
    private Long id;
    private String name;
    private String email;
    private String owner;

    public PendingRestaurantDTO(Long id, String name, String email, String owner) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.owner = owner;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

    
}
