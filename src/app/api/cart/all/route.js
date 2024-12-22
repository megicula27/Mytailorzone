import dbConnect from "@/database/mongoDb/db"; // Ensure you have a utility for DB connection
import Cart from "@/models/Cart/Cart"; // Import your Cart model
import Product from "@/models/Product/Product"; // Import your Product model
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();

    const userId = req.headers.get("user-id");
    // console.log("userId: " + userId);

    if (!userId || userId.trim() === "") {
      return NextResponse.json(
        { error: "User ID not provided or invalid" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 404 });
    }

    const items = cart.items.map((item) => ({
      uid: item.product.uid,
      quantity: item.quantity,
    }));

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
