package com.rukesh.request;

import lombok.Data;

@Data
public class UpdateRestaurantStatusRequest {
    private boolean open;

	public boolean isOpen() {
		return open;
	}

	public void setOpen(boolean open) {
		this.open = open;
	}

	
}
