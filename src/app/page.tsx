import Hero from "@/components/Hero";
import FontShowcase from "@/components/Retangle";
import Dress from "@/components/dress";
import CustomerCarousel from "@/components/Customer";
import Product from "./product/page";
import Top_sell from "./product/sell";

export default function Home() {
  return (
   <div>
    <Hero/>
    <FontShowcase/>
    <Product/>
    <Top_sell/>
    <Dress/>
    <CustomerCarousel/>
   </div>
  );
}
