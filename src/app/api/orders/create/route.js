import { NextResponse } from "next/server";
import dbConnect from "@/database/mongoDb/db";
import Order from "@/models/Order/Order";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    await dbConnect();
    const body = await req.json();

    const { userId, items, totalAmount, shippingAddress } = body;

    if (!userId || !items || !totalAmount || !shippingAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add validation for userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid userId format" },
        { status: 400 }
      );
    }

    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
    });

    const savedOrder = await order.save();

    return NextResponse.json({ order: savedOrder }, { status: 201 });
  } catch (error) {
    console.error("Full error:", error); // Add this line
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
