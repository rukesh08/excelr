package com.rukesh.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.rukesh.model.Order;
import com.rukesh.response.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentServiceImpl implements PaytmentService {
	
	@Value("${stripe.api.key}")
	private String stripeSecretKey;

	@Override
	public PaymentResponse createPaymentLink(Order order) throws StripeException {
		
		Stripe.apiKey=stripeSecretKey;
		int deliveryFee=62;
		
		SessionCreateParams params=SessionCreateParams.builder().addPaymentMethodType(
				SessionCreateParams.
				PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("http://localhost:3000/payment/success/" + order.getId() + "?session_id={CHECKOUT_SESSION_ID}")
				.setCancelUrl("http://localhost:3000/payment/fail/")
				.addLineItem(SessionCreateParams.LineItem.builder()
						.setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder()
								.setCurrency("inr")
								.setUnitAmount((Long)order.getTotalPrice()*100+deliveryFee*100)
								.setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
										.setName("tomato")
										.build())
								
								.build()
						)
						.build()
						
					)
					.build();
		
			
			Session session=Session.create(params);
			
			PaymentResponse res=new PaymentResponse();
			res.setPayment_url(session.getUrl());
			
			
			
			
			return res;
	}

}
