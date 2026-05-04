import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET(request) {
  try {
    await client.connect();
    const db = client.db("tiles-gallery");
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const searchTerm = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    let query = {};

    if (email && email !== "undefined" && email !== "null") {
      query.userEmail = email;
    }

 
    if (searchTerm) {
      query.title = { $regex: searchTerm, $options: "i" };
    }


    if (category && category !== "all") {
      query.category = category;
    }

  
    const tiles = await db.collection("tiles")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(tiles, { 
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      }
    });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch tiles" }, { status: 500 });
  }
}