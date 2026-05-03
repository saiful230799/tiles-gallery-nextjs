import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI);

export async function DELETE(request, { params }) {
  try {

    const { id } = await params; 
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const db = client.db("tiles-gallery");
    
    const result = await db.collection("inquiries").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Inquiry deleted successfully" });
    }
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}