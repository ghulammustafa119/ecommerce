"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import DashboardNav from "@/components/navbar";

interface OrderProduct {
  TrackingId: string;
  name: string;
  price: number;
  qty: number;
  size?: string;
  color?: string;
}

interface Order {
  _id: string;
  _createdAt: string;
  status?: string;
  shippingForm?: { fullName: string; email: string };
  products?: OrderProduct[];
}

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const query = `*[_type == "orders"]{
          _id,
          shippingForm->{ fullName, email },
          _createdAt,
          status,
          products[] { TrackingId, name, price, qty, size, color }
        }`;
        const data = await client.fetch(query);
        setOrders(data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function deleteOrder(orderId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await client.delete(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      alert("Failed to delete order. Check permissions.");
    }
  }

  if (Loading) {
    return <div className="mt-20 h-screen flex justify-center items-center font-bold text-3xl">Loading....</div>;
  }

  return (
    <>
      <DashboardNav />
      <div className="container mx-auto p-4 ">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm md:text-base">
                <th className="border px-2 md:px-4 py-2">Order Name</th>
                <th className="border px-2 md:px-4 py-2">Email</th>
                <th className="border px-2 md:px-4 py-2">Date</th>
                <th className="border px-2 md:px-4 py-2">Tracking ID</th>
                <th className="border px-2 md:px-4 py-2">Product</th>
                <th className="border px-2 md:px-4 py-2">Price</th>
                <th className="border px-2 md:px-4 py-2">Quantity</th>
                <th className="border px-2 md:px-4 py-2">Status</th>
                <th className="border px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? (
                orders.map((order, orderIndex) =>
                  order?.products?.map((product, index) => (
                    <tr key={`${orderIndex}-${index}`} className="text-sm md:text-base">
                      <td className="border px-2 md:px-4 py-2">{order?.shippingForm?.fullName || "N/A"}</td>
                      <td className="border px-2 md:px-4 py-2">{order?.shippingForm?.email || "N/A"}</td>
                      <td className="border px-2 md:px-4 py-2">{new Date(order?._createdAt || "").toLocaleDateString()}</td>
                      <td className="border px-2 md:px-4 py-2">{product?.TrackingId || "N/A"}</td>
                      <td className="border px-2 md:px-4 py-2">{product?.name || "N/A"}</td>
                      <td className="border px-2 md:px-4 py-2">${product?.price || 0}</td>
                      <td className="border px-2 md:px-4 py-2">{product?.qty || 0}</td>
                      <td className="border px-2 md:px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs md:text-sm ${
                            order?.status === "pending" || !order?.status
                              ? "bg-yellow-500"
                              : order?.status === "shipped"
                              ? "bg-blue-500"
                              : order?.status === "delivered"
                              ? "bg-green-500"
                              : order?.status === "cancelled"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {order?.status || "pending"}
                        </span>
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        <button
                          onClick={() => deleteOrder(order?._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan={11} className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}