"use server";

import Stripe from "stripe";

export async function createPaymentIntent(amountInCents: number) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  if (!amountInCents || amountInCents <= 0) {
    throw new Error("Invalid payment amount");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
}
