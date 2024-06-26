// PaymentComponent.js
"use client";
import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";

const FlutterwareComponent = ({ amount, currency, title, cssStyle }: any) => {
  const config = {
    public_key: "FLWPUBK_TEST-bdea4f723348e87aba0ae95a3ce79385-X", // Replace with your public key
    tx_ref: `tx-${Date.now()}`,
    amount: amount,
    currency: currency,
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: "customer-email@example.com",
      phone_number: "080********",
      name: "John Doe",
    },
    customizations: {
      title: "My Store",
      description: "Payment for items in cart",
      logo: "https://mylogo.com/logo.png",
    },
  };

  const handleFlutterwavePayment = useFlutterwave(config);

  return (
    <Button
      className={cssStyle}
      variant="outline"
      onClick={() => {
        handleFlutterwavePayment({
          callback: (response) => {
            console.log(response);
            closePaymentModal(); // this will close the modal programmatically
          },
          onClose: () => {},
        });
      }}
    >
      {title}
    </Button>
  );
};

const StripeComponent = ({ amount, currency, title, cssStyle }: any) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency }),
    });
    const session = await res.json();

    const stripePromise = loadStripe(
      "pk_test_51PVl0ZIU4MeowKFNME81ZWJb4UVo5ogCunCYUlQxT8aQHPmfkyZu3qHw4LjRYz5k9pvfW9jg4ltkWIV88Qvfjf9j00rBW12Rge"
    ); // Replace with your Stripe publishable key
    const stripe = await stripePromise;

    if (stripe != null) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Stripe Checkout error", error);
        setLoading(false);
      }
    } else {
      console.error("Stripe Checkout error");
      setLoading(false);
    }
  };

  return (
    <Button
      role="link"
      onClick={handleClick}
      className={cssStyle}
      disabled={loading}
    >
      {loading ? "Processing..." : "Checkout"}
    </Button>
  );
};

export { FlutterwareComponent, StripeComponent };
