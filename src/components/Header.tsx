"use client"
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { SheetSide } from "./Hamburger";
import { NavigationMenuDemo } from "./navigationMenu";
import { useSelector } from "react-redux";
import AnnouncementBar from "./AnnouncementBar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Search from "./search";
import { CartItem } from "@/type";

export default function Header() {
  const cart: CartItem[] = useSelector((state: { cart: CartItem[] }) => state.cart)

  return (
    <>
      <div className="fixed z-10 top-0 w-full" role="banner">
        <AnnouncementBar />
        <header className="w-full border-b bg-white h-[60px] md:h-[90px] flex justify-between items-center pr-2 max-w-screen-2xl mx-auto">
          <div className="flex items-center">
            <SheetSide />
            <Link href="/" aria-label="Shop.co Home">
              <h1 className="text-2xl md:text-4xl font-extrabold pl-2">SHOP.CO</h1>
            </Link>
          </div>
          <nav className="flex-1 flex justify-center" aria-label="Main navigation">
            <ul className="flex space-x-8 items-center" role="menubar">
              <li role="none"><NavigationMenuDemo /></li>
              <li role="none"><Link href="/" role="menuitem">Home</Link></li>
              <li role="none"><Link href="/sell" role="menuitem">On Sale</Link></li>
              <li role="none"><Link href="/product" role="menuitem">New Arrivals</Link></li>
              <li role="none"><Link href="/brands" role="menuitem">Brands</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Search />
            <Link href={"/cart"} className="relative" aria-label={`Shopping cart${cart.length > 0 ? `, ${cart.length} items` : ""}`}>
              <IoCartOutline className="text-3xl lg:text-4xl" aria-hidden="true" />
              {cart.length > 0 && (
                <span className="absolute top-[-5px] bg-red-400 rounded-full text-white w-[20px] h-[20px] flex justify-center items-center p-1 text-sm right-0" aria-hidden="true">{cart.length}</span>
              )}
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-red-500 cursor-pointer font-bold" aria-label="Login or Register">Login/Register</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
      </div>
    </>
  );
}
