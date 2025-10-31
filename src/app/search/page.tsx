"use client";
import { useEffect, useState } from "react";
import { useSearchParams} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setNotFound(false);
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setNotFound(!data || data.length === 0);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setNotFound(true);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Search Results for: <span className="text-blue-600">{query}</span></h1>
        <Link href="/casual">
          <Button variant="outline" className="rounded-[20px]">View All</Button>
        </Link>
      </div>
      {loading && <p>Loading...</p>}
      {notFound && !loading && <p className="text-red-500">No products found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`} className="block border rounded-lg p-4 hover:shadow-lg transition">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 