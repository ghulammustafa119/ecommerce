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

  // Sanitize query to prevent GROQ injection
  const sanitizedQuery = query.replace(/["\\]/g, "");

  let groqQuery = "";
  const projection = `{
    _id,
    name,
    price,
    description,
    "image": image.asset->url,
    discountPercent
  }`;

  if (categories.includes(sanitizedQuery)) {
    groqQuery = `*[_type == "product" && category == $query] ${projection}`;
  } else {
    groqQuery = `*[_type == "product" && (name match $matchQuery || name == $query)] ${projection}`;
  }

  try {
    const params: Record<string, string> = {
      query: sanitizedQuery,
      matchQuery: `*${sanitizedQuery}*`,
    };
    const products = await client.fetch(groqQuery, params);
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