import dbConnect from "@/database/mongoDb/db";
import { Cart } from "@/models/Cart/Cart";
import { Product } from "@/models/Product/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, productUid, quantity } = body;

    // Find the product by uid
    const product = await Product.findOne({ uid: productUid });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.uid === productUid
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item if it doesn't exist
      cart.items.push({
        product: product._id,
        quantity,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
