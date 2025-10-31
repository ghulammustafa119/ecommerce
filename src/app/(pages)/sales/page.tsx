"use client";
import { client } from "@/sanity/lib/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaStore, FaDollarSign, FaShoppingBag, FaMoneyBill } from "react-icons/fa";

export default function StatsComponent() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "orders"]{
          _id,
          shippingForm->{ fullName, email },
          _createdAt,
          status,
          products[] { TrackingId, name, price, qty, size, color }
        }`;
        const data = await client.fetch(query);
     
        setOrders(data || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading stats...</p>;
  }

  // Total Orders Count
  const totalOrders = orders.length;

  // Total Revenue Calculation
  const totalRevenue = orders.reduce((acc, order) => {
    return (
      acc +
      (order.products?.reduce((sum: any, product: any) => sum + (product.price || 0) * (product.qty || 1), 0) || 0)
    );
  }, 0);

  // Active Users Calculation (Unique customers)
  const activeUsers = new Set(orders.map((order) => order.shippingForm?.email)).size;

  // Monthly Product Sale (Total products sold)
  const monthlyProductSale = orders.reduce((acc, order) => {
    return acc + (order.products?.reduce((sum: any, product: any) => sum + (product.qty || 1), 0) || 0);
  }, 0);

  const stats = [
    { id: 1, icon: <FaStore size={40} />, value: totalOrders, text: "Total Orders Placed" },
    { id: 2, icon: <FaDollarSign size={40} />, value: `$${totalRevenue.toLocaleString()}`, text: "Total Revenue" },
    { id: 3, icon: <FaShoppingBag size={40} />, value: activeUsers, text: "Active Users" },
    { id: 4, icon: <FaMoneyBill size={40} />, value: monthlyProductSale, text: "Monthly Product Sale" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 mt-10">
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          className="flex flex-col items-center bg-white border rounded-xl p-6 w-64 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-black text-white p-4 rounded-full">{stat.icon}</div>
          <h2 className="text-2xl font-bold mt-3">{stat.value}</h2>
          <p className="text-gray-600">{stat.text}</p>
        </motion.div>
      ))}
    </div>
  );
}