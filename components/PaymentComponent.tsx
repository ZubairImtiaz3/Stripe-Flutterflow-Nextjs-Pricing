// PaymentComponent.js
"use client";
import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button";

const PaymentComponent = ({ amount, currency, title, cssStyle }: any) => {
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

export default PaymentComponent;
