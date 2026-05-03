import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await client.connect();
        const db = client.db("tiles-gallery");
        
        const tile = await db.collection("tiles").findOne({ _id: new ObjectId(id) });

        if (!tile) {
            return NextResponse.json({ message: "Tile not found" }, { status: 404 });
        }
        
        return NextResponse.json(tile, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        await client.connect();
        const db = client.db("tiles-gallery");
        const updatedData = await request.json();

        const { _id, ...dataToUpdate } = updatedData;

        const result = await db.collection("tiles").updateOne(
            { _id: new ObjectId(id) },
            { $set: dataToUpdate }
        );

        if (result.matchedCount === 1) {
            return NextResponse.json({ success: true, message: "Updated successfully" });
        }
        return NextResponse.json({ success: false, message: "Tile not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}


export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await client.connect();
        const db = client.db("tiles-gallery");
        
        const result = await db.collection("tiles").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true, message: "Deleted successfully" });
        }
        return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}