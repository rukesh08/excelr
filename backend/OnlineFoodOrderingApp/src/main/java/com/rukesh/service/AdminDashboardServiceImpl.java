package com.rukesh.service;

import com.rukesh.dto.AdminDashboardResponse;
import com.rukesh.dto.MonthlyOrderDto;
import com.rukesh.dto.PendingRestaurantDTO;
import com.rukesh.model.enums.RestaurantStatus;
import com.rukesh.repository.OrderRepository;

import com.rukesh.repository.PaymentRepository;
import com.rukesh.repository.RestaurantRepository;
import com.rukesh.repository.UserRepository;
import com.rukesh.service.AdminDashboardService;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminDashboardServiceImpl implements AdminDashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboardData(String userRole) {
        long totalUsers = userRepository.count();
        long totalRestaurants = restaurantRepository.count();
        long approvedRestaurants = restaurantRepository.countByApprovedTrue();
        long pendingRestaurants = totalRestaurants - approvedRestaurants;
        long totalOrders = orderRepository.count();
        double totalPayments = paymentRepository.sumTotalAmount();

        List<PendingRestaurantDTO> pendingList = restaurantRepository
                .findByStatus(RestaurantStatus.PENDING)
                .stream()
                .map(r -> new PendingRestaurantDTO(
                        r.getId(),
                        r.getName(),
                        r.getOwner() != null ? r.getOwner().getEmail() : "N/A",
                        r.getOwner() != null ? r.getOwner().getFullName() : "N/A"
                ))
                .toList();

        List<MonthlyOrderDto> monthlyOrders = new ArrayList<>();
        for (int i = 5; i >= 0; i--) {
            YearMonth yearMonth = YearMonth.now().minusMonths(i);
            LocalDate startDate = yearMonth.atDay(1);
            LocalDate endDate = yearMonth.atEndOfMonth();

            int count = orderRepository.countOrdersBetween(
                    startDate.atStartOfDay(),
                    endDate.atTime(23, 59, 59)
            );

            String month = yearMonth.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            monthlyOrders.add(new MonthlyOrderDto(month, count));
        }

        return new AdminDashboardResponse(
                userRole,
                totalUsers, totalRestaurants, approvedRestaurants,
                pendingRestaurants, totalOrders, totalPayments,
                pendingList, monthlyOrders
        );
    }
}
