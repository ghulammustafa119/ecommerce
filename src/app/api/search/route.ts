import { NextRequest } from "next/server";
import { client } from "@/sanity/lib/client";

const categories = [
  "shirt",
  "tshirt",
  "short",
  "jeans",
  "hoodie",
  "paint"
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("query") || "").toLowerCase().trim();

  if (!query) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  let groqQuery = "";
  if (categories.includes(query)) {
    // Category match: only show products of that category
    groqQuery = `*[_type == "product" && category == "${query}"] {
      _id,
      name,
      price,
      description,
      "image": image.asset->url,
      discountPercent
    }`;
  } else {
    // Name match: match exact word (not as substring)
    groqQuery = `*[_type == "product" && (name match "* ${query} *" || name match "${query} *" || name match "* ${query}" || name == "${query}")] {
      _id,
      name,
      price,
      description,
      "image": image.asset->url,
      discountPercent
    }`;
  }

  try {
    const products = await client.fetch(groqQuery);
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 