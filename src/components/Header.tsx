"use client"
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { SheetSide } from "./Humburgur";
import { NavigationMenuDemo } from "./navigationMenu";
import { useSelector } from "react-redux";
import AnnouncementBar from "./AnnouncementBar";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Search from "./search";

export default function Header() {
  const cart =  useSelector((state:any)=>state.cart)

  return (
    <>
    <div className="fixed z-10 top-0 w-full">
    <AnnouncementBar/>
     <header className="w-full border-b bg-white h-[60px] md:h-[90px] flex justify-between items-center pr-2 max-w-screen-2xl mx-auto">
        <div className="flex items-center">
          <SheetSide />
          {/* logo */}
          <h1 className="text-2xl md:text-4xl font-extrabold pl-2">SHOP.CO</h1>
        </div>
        {/* navigation bar */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-8 items-center">
            <li><NavigationMenuDemo /></li>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/sell">On Sale</Link></li>
            <li><Link href="/product">New Arrivals</Link></li>
            <li><Link href="/brands">Brands</Link></li>
          </ul>
        </nav>
        {/* right */}
        <div className="flex items-center space-x-4">
          <Search />
          <Link href={"/cart"} className="relative">
            <IoCartOutline className="text-3xl lg:text-4xl" />
            {cart.length > 0 && (
              <span className="absolute top-[-5px] bg-red-400 rounded-full text-white w-[20px] h-[20px] flex justify-center items-center p-1 text-sm right-0">{cart.length}</span>
            )}
          </Link>
          <ClerkProvider>
            <SignedOut>
              <SignInButton mode="modal">
                <h1 className="text-red-500 cursor-pointer">Login/Register</h1>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkProvider>
        </div>
      </header>
     </div>
     </>
  );
}