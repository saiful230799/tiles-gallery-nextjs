import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "tiles.json");
        const jsonData = fs.readFileSync(filePath, "utf-8");
        const tiles = JSON.parse(jsonData);

        const db = client.db("tiles-gallery");
        
        const result = await db.collection("tiles").insertMany(tiles);

        return NextResponse.json({ 
            success: true, 
            message: `${result.insertedCount} tiles imported successfully!`,
            data: result 
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}