"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Top_sell from "@/components/Top_sell";
import { BreadcrumbCollapsed } from "@/components/Breadcrumb";
import Toastify from "@/app/cart/toastify";
import ReviewForm from "../Review";
import { Product } from "@/type";

export default function SlugPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [cartItem, setCartItem] = useState<{
    id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    qty: number;
    discount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const slug: Product | null = await client.fetch(
          `*[_type == 'product' && _id == $id][0]{
            "image": image.asset->url,
            category,
            discountPercent,
            "isNew": new,
            name,
            description,
            price,
            _id,
            colors,
            sizes
          }`,
          { id: params.id }
        );

        if (!slug) {
          setError(true);
        } else {
          setProduct(slug);
          setCartItem({
            id: slug._id,
            name: slug.name,
            image: slug.image,
            price: slug.price,
            size: slug.sizes?.[0] || "",
            color: slug.colors?.[0] || "",
            qty: 1,
            discount: slug.discountPercent || 0,
          });
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <h1 className="text-center mt-36 font-bold">Loading...</h1>;
  }

  if (error || !product || !cartItem) {
    return (
      <div className="mt-36 text-red-500 text-center font-bold">
        <BreadcrumbCollapsed />
        Product not found
      </div>
    );
  }

  return (
    <>
      <div className="mt-28 md:mt-36">
        <BreadcrumbCollapsed />
        <div className="flex h-full items-center flex-col md:flex-row justify-center sm:justify-evenly sm:p-0 max-w-screen-2xl mx-auto">
          {/* Left */}
          <div className="flex space-x-4 md:space-x-0 md:space-y-3 p-5 md:flex-col justify-between items-center md:w-[200px] order-2 md:order-1">
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                className="w-[100px] h-[100px] md:h-[150px] lg:mt-3 rounded-[20px]"
                alt={product.name}
                width={100}
                height={100}
              />
            )}
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                className="w-[100px] h-[100px] md:h-[150px] lg:mt-3 rounded-[20px]"
                alt={product.name}
                width={100}
                height={100}
              />
            )}
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                className="w-[100px] h-[100px] md:h-[150px] lg:mt-3 rounded-[20px]"
                alt={product.name}
                width={100}
                height={100}
              />
            )}
          </div>
          {/* Mid */}
          <div className="w-[90%] pb-3 h-[260px] lg:w-[500px] md:h-[500px] mt-5 lg:mt-0 order-1 md::order-2">
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                className="w-full h-full sm:mt-3 rounded-[20px]"
                alt={product.name}
                width={500}
                height={500}
              />
            )}
          </div>
          {/* Right */}
          <div className="w-full p-5 lg:w-[500px] lg:h-[500px] order-3">
            <h1 className="text-2xl lg:text-3xl font-bold">{cartItem.name}</h1>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-bold">${cartItem.price * cartItem.qty}</p>
              {cartItem.discount > 0 && (
                <span className="text-gray-400 line-through">
                  ${((cartItem.price - (cartItem.price * cartItem.discount) / 100) * cartItem.qty).toFixed(2)}
                </span>
              )}
              {cartItem.discount > 0 && (
                <span className="bg-red-400 rounded-[10px] px-1">{`-${cartItem.discount}%`}</span>
              )}
            </div>
            <p className="text-sm">{product.description}</p>
            {/* Select Color */}
            <div className="mt-5">
              <p className="text-gray-500">Select Colors</p>
              <div className="flex space-x-3 mt-2">
                {product.colors?.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setCartItem({ ...cartItem, color })}
                    aria-label={`Select color ${color}`}
                    aria-pressed={cartItem.color === color}
                    className={`w-[37px] h-[37px] border border-black rounded-full flex justify-center items-center ${cartItem.color === color ? "ring-2 ring-black" : ""}`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
            {/* Choose Size */}
            <div className="mt-4">
              <p className="text-gray-500">Choose Size</p>
              <div className="flex space-x-3 mt-2">
                {product.sizes?.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setCartItem({ ...cartItem, size })}
                    aria-label={`Select size ${size}`}
                    aria-pressed={cartItem.size === size}
                    className={`w-[80px] h-[40px] flex justify-center items-center rounded-[62px] bg-[#F0F0F0] ${cartItem.size === size ? "bg-black text-white" : "text-gray-400"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* Quantity & Add to Cart */}
            <div className="flex justify-start items-center mt-7 space-x-4" role="group" aria-label="Quantity selector">
              <button
                aria-label="Decrease quantity"
                onClick={() =>
                  setCartItem({
                    ...cartItem,
                    qty: cartItem.qty <= 1 ? 1 : cartItem.qty - 1,
                  })
                }
              >
                <Minus aria-hidden="true" />
              </button>
              <span aria-live="polite" aria-label={`Quantity: ${cartItem.qty}`}>{cartItem.qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() =>
                  setCartItem({ ...cartItem, qty: cartItem.qty + 1 })
                }
              >
                <Plus />
              </button>
              <Toastify cartItem={cartItem} />
            </div>
          </div>
        </div>
      </div>
      <ReviewForm />
      <Top_sell />
    </>
  );
}
