"use client"
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Cartpage from "./cartpage";
import { useSelector } from "react-redux";
import { BreadcrumbCollapsed } from "@/components/Breadcrumb";
import Link from "next/link";
import { CartItem } from "@/type";

const PROMO_CODES: Record<string, number> = {
  "SAVE10": 10,
  "SAVE20": 20,
  "WELCOME": 15,
};

const Page = () => {
  const cartArray: CartItem[] = useSelector((state: { cart: CartItem[] }) => state.cart);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const subtotal = cartArray.reduce((sum: number, item: CartItem) => {
    const discountedPrice = item.discount > 0 ? item.price - (item.price * item.discount) / 100 : item.price;
    return sum + discountedPrice * item.qty;
  }, 0);

  const promoAmount = (subtotal * promoDiscount) / 100;
  const total = subtotal - promoAmount;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoDiscount(PROMO_CODES[code]);
      setPromoError("");
    } else {
      setPromoDiscount(0);
      setPromoError("Invalid promo code");
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto mt-28 lg:mt-36">
        <BreadcrumbCollapsed />
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-[95%] max-w-[1200px]"></div>
          <div className="sm:w-full flex flex-col lg:flex-row justify-center items-start gap-6 p-5">
            <Cartpage />
            {/* Order Summary */}
            <div className="bg-white p-4 w-full lg:w-[500px] border rounded-[20px]">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Discount {promoDiscount > 0 ? `(-${promoDiscount}%)` : ""}</p>
                  <p className="text-red-500">-${promoAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery Fee</p>
                  <p>$0.00</p>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <input
                    className="h-10 rounded-[6px] bg-[#F0F0F0] px-4 w-[200px] md:w-[360px] border-none"
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button className="w-[100px] rounded-[20px]" onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>
                {promoError && <p className="text-red-500 text-sm">{promoError}</p>}
                {promoDiscount > 0 && <p className="text-green-500 text-sm">Promo code applied! {promoDiscount}% off</p>}
              </div>
              {cartArray.length > 0 &&
                <Link href={"/checkout"}>
                  <button className="w-full mt-4 bg-black text-white py-2 rounded-md">
                    Go to Checkout
                  </button>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;
