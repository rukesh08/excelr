
package com.rukesh.dto;

public class MonthlyOrderDto {
    private String month;
    private int orders;

    public MonthlyOrderDto(String month, int orders) {
        this.month = month;
        this.orders = orders;
    }

    public String getMonth() {
        return month;
    }

    public int getOrders() {
        return orders;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public void setOrders(int orders) {
        this.orders = orders;
    }
}
