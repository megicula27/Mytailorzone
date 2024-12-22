import { NextResponse } from "next/server";
import dbConnect from "@/database/mongoDb/db";
import Cart from "@/models/Cart/Cart";

export const POST = async (req) => {
  try {
    await dbConnect();
    const { itemId } = await req.json();
    const userId = req.headers.get("user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not provided" },
        { status: 400 }
      );
    }

    // Fetch the cart with populated product details
    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Filter out the item by matching the `uid` of the product
    cart.items = cart.items.filter((item) => item.product.uid != itemId);

    await cart.save();

    return NextResponse.json(
      { message: "Item removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
