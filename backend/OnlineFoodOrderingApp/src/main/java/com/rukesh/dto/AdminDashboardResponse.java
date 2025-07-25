package com.rukesh.dto;

import java.util.List;

public class AdminDashboardResponse {
	private String userRole;
    private long totalUsers;
    private long totalRestaurants;
    private long approvedRestaurants;
    private long pendingRestaurants;
    private long totalOrders;
    private double totalPayments;
    private List<PendingRestaurantDTO> pendingRestaurantList;
    
    private List<MonthlyOrderDto> monthlyOrders;



    
    public AdminDashboardResponse(
            String userRole,
            long totalUsers,
            long totalRestaurants,
            long approvedRestaurants,
            long pendingRestaurants,
            long totalOrders,
            double totalPayments,
            List<PendingRestaurantDTO> pendingRestaurantList,
            List<MonthlyOrderDto> monthlyOrders
    ) {
        this.userRole = userRole;
        this.totalUsers = totalUsers;
        this.totalRestaurants = totalRestaurants;
        this.approvedRestaurants = approvedRestaurants;
        this.pendingRestaurants = pendingRestaurantList.size(); 
        this.pendingRestaurantList = pendingRestaurantList;
        this.totalOrders = totalOrders;
        this.totalPayments = totalPayments;
        this.monthlyOrders = monthlyOrders;
    }
    
    public List<MonthlyOrderDto> getMonthlyOrders() {
        return monthlyOrders;
    }

    public void setMonthlyOrders(List<MonthlyOrderDto> monthlyOrders) {
        this.monthlyOrders = monthlyOrders;
    }
    
    


	public String getUserRole() {
		return userRole;
	}



	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}



	public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalRestaurants() {
        return totalRestaurants;
    }

    public void setTotalRestaurants(long totalRestaurants) {
        this.totalRestaurants = totalRestaurants;
    }

    public long getApprovedRestaurants() {
        return approvedRestaurants;
    }

    public void setApprovedRestaurants(long approvedRestaurants) {
        this.approvedRestaurants = approvedRestaurants;
    }

    public long getPendingRestaurants() {
        return pendingRestaurants;
    }

    public void setPendingRestaurants(long pendingRestaurants) {
        this.pendingRestaurants = pendingRestaurants;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public double getTotalPayments() {
        return totalPayments;
    }

    public void setTotalPayments(double totalPayments) {
        this.totalPayments = totalPayments;
    }
    
    public List<PendingRestaurantDTO> getPendingRestaurantList() {
        return pendingRestaurantList;
    }

    public void setPendingRestaurantList(List<PendingRestaurantDTO> pendingRestaurantList) {
        this.pendingRestaurantList = pendingRestaurantList;
    }
}
