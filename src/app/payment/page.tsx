"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { CartItem } from "@/type";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const cartArray: CartItem[] = useSelector((state: { cart: CartItem[] }) => state.cart);

  const total = cartArray.reduce((sum, item) => {
    const discountedPrice = item.discount > 0 ? item.price - (item.price * item.discount) / 100 : item.price;
    return sum + discountedPrice * item.qty;
  }, 0);

  // Convert to cents for Stripe (minimum $0.50)
  const amountInCents = Math.max(Math.round(total * 100), 50);

  useEffect(() => {
    createPaymentIntent(amountInCents)
      .then((res) => {
        setClientSecret(res.clientSecret);
      });
  }, [amountInCents]);

  if (!clientSecret) {
    return <div className="mt-36 text-center">Loading...</div>;
  }

  return (
    <div className="mt-36" style={{ maxWidth: 500, margin: "0 auto" }}>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-4 text-lg">Total: ${total.toFixed(2)}</p>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      setIsProcessing(false);
      router.push('/payment-success');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="w-full bg-blue-400 text-white py-2 mt-1 rounded-sm"
        type="submit"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div style={{ color: "red", marginTop: 8 }}>{errorMessage}</div>}
    </form>
  );
}
