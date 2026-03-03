"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css";
import { add } from '../Redux/features/cart';
import { Button } from '@/components/ui/button';

interface ToastifyProps {
  cartItem: {
    id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    qty: number;
    discount: number;
  };
}

function Toastify({ cartItem }: ToastifyProps) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(add(cartItem))
    toast.success('Product added Successfully!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  return (
    <>
      <Button onClick={handleAddToCart} className="bg-black text-white lg:w-[300px]">
        Add to Cart
      </Button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default Toastify
