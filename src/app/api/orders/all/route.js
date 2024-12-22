// app/api/orders/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/database/mongoDb/db";
import Order from "@/models/Order/Order";

export async function GET(req) {
  try {
    await dbConnect();

    // Get userId from URL params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "UserId is required" },
        { status: 400 }
      );
    }

    // Fetch orders for the user
    const orders = await Order.find({
      userId: userId,
    }).sort({ createdAt: -1 }); // Sort by newest first

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
