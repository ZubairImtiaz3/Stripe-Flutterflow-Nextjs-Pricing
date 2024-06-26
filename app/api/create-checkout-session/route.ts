import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PVl0ZIU4MeowKFN4XKIPGJHqIbxxmAReS87oCSqip9xfFqXs9oUOFMZYFgbHYWaPrZdLiN0TFONMUXnLOqA99w600AVitsOxf');

interface ExchangeRates {
  [key: string]: number; // Key is a string (currency code), value is a number (exchange rate)
}

// Example exchange rate function (replace with actual logic)
const convertToUSD = (amount: number, currency: string) => {
  // Replace with actual exchange rate logic
  const exchangeRates: ExchangeRates = {
    'NGN': 0.0024, // Example: 1 NGN = 0.0024 USD
  };

  if (currency === 'USD') {
    return amount; // No conversion needed if currency is USD
  } else if (currency in exchangeRates) {
    return amount * exchangeRates[currency];
  } else {
    throw new Error(`Unsupported currency: ${currency}`);
  }
};

export async function POST(request: Request) {
  const { amount, currency } = await request.json();

  let amountInUSD = amount;
  if (currency !== 'USD') {
    amountInUSD = convertToUSD(amount, currency);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency as string,
            product_data: {
              name: 'Total Payment',
            },
            unit_amount: Math.round(amountInUSD * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://gmind-pricing.vercel.app/success`, // Replace with your success URL
      cancel_url: `https://gmind-pricing.vercel.app/cancel`,   // Replace with your cancel URL
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}