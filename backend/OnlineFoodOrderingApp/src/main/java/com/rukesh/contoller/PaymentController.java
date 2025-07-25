package com.rukesh.contoller;

import com.rukesh.model.Order;
import com.rukesh.model.Payment;
import com.rukesh.repository.OrderRepository;
import com.rukesh.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/success/{orderId}")
    public ResponseEntity<String> handleSuccessPayment(
            @PathVariable Long orderId,
            @RequestParam(name = "session_id") String sessionId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Optional: Avoid duplicate payment entry
        if (paymentRepository.existsByStripeSessionId(sessionId)) {
            return ResponseEntity.ok("Payment already recorded.");
        }

        Payment payment = Payment.builder()
                .amount(order.getTotalPrice())
                .order(order)
                .stripeSessionId(sessionId)
                .paymentDate(LocalDateTime.now())
                .build();

        paymentRepository.save(payment);

        return ResponseEntity.ok("Payment Success Recorded");
    }
}

