import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(request) {
  try {
    const db = client.db("tiles-gallery");
    const body = await request.json();
    
    const result = await db.collection("inquiries").insertOne(body);
    
    return NextResponse.json({ message: "Inquiry saved!", id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}