// constants/products.js
export const PRODUCTS_DATA = {
  1: {
    name: "Peachy Bloom Cotton Suit Set",
    image: "/product_1_0.webp??height=100&width=100",
  },
  2: {
    name: "Shimmer Orange Sharara Suit Set",
    image: "/product_2_0.webp?height=100&width=100",
  },
  3: {
    name: "Scarlet Red Ruffle Saree",
    image: "/product_3_0.webp?height=100&width=100",
  },
};
export const dummyProducts = [
  {
    id: "1",
    name: "Peachy Bloom Cotton Suit Set",
    price: 1099,
    image: "/product_1_0.webp?height=100&width=100",
  },
  {
    id: "2",
    name: "Shimmer Orange Sharara Suit Set",
    price: 899,
    image: "/product_2_0.webp?height=100&width=100",
  },
  {
    id: "3",
    name: "Scarlet Red Ruffle Saree",
    price: 1299,
    image: "/product_3_0.webp?height=100&width=100",
  },
];
export const products = [
  {
    id: "1",
    name: "Peachy Bloom Cotton Suit Set",
    price: 1099,
    images: [
      "/product_1_0.webp?height=400&width=400",
      "/product_1_1.webp?height=400&width=400",
      "/product_1_2.webp?height=400&width=400",
    ],
  },
  {
    id: "2",
    name: "Shimmer Orange Sharara Suit Set",
    price: 899,
    images: [
      "/product_2_0.webp?height=400&width=400",
      "/product_2_1.webp?height=400&width=400",
      "/product_2_2.webp?height=400&width=400",
    ],
  },
  {
    id: "3",
    name: "Scarlet Red Ruffle Saree",
    price: 1299,
    images: [
      "/product_3_0.webp?height=300&width=400",
      "/product_3_1.webp?height=400&width=400",
      "/product_3_2.webp?height=400&width=400",
    ],
  },
];
export const PRODUCTS_ITEMS = [
  {
    id: "1",
    name: "Peachy Bloom Cotton Suit Set",
    description:
      "Elevate your home decor with our exquisite Ceramic Vase Collection. Each piece is handcrafted by skilled artisans, featuring unique textures and elegant designs that blend seamlessly with any interior style.",

    price: 1099,
    images: [
      "/product_1_0.webp?height=400&width=400",
      "/product_1_1.webp?height=400&width=400",
      "/product_1_2.webp?height=400&width=400",
    ],
    rating: 4.5,
    reviews: [
      {
        id: "10",
        author: "Jane Doe",
        rating: 5,
        comment: "Absolutely beautiful! The craftsmanship is outstanding.",
      },
      {
        id: "20",
        author: "John Smith",
        rating: 4,
        comment: "Great quality, but shipping took longer than expected.",
      },
      {
        id: "30",
        author: "Emily Brown",
        rating: 5,
        comment:
          "These vases are stunning. They've completely transformed my living room.",
      },
    ],
  },
  {
    id: "2",
    name: "Shimmer Orange Sharara Suit Set",
    price: 899,
    description:
      "Our Handcrafted Pottery Set brings rustic charm to your dining experience. Each piece is uniquely shaped and glazed, creating a one-of-a-kind set that's both functional and decorative.",

    images: [
      "/product_2_0.webp?height=400&width=400",
      "/product_2_1.webp?height=400&width=400",
      "/product_2_2.webp?height=400&width=400",
    ],
    rating: 4.2,
    reviews: [
      {
        id: "10",
        author: "Jane Doe",
        rating: 5,
        comment: "Absolutely beautiful! The craftsmanship is outstanding.",
      },

      {
        id: "30",
        author: "Emily Brown",
        rating: 5,
        comment:
          "These vases are stunning. They've completely transformed my living room.",
      },
    ],
  },
  {
    id: "3",
    name: "Scarlet Red Ruffle Saree",
    price: 1299,
    description:
      "Indulge your senses with our Artisan Candle Bundle. Featuring a variety of hand-poured soy candles in exquisite scents, this set creates a warm and inviting atmosphere in any room.",

    images: [
      "/product_3_0.webp?height=300&width=400",
      "/product_3_1.webp?height=400&width=400",
      "/product_3_2.webp?height=400&width=400",
    ],
    rating: 4.8,
    reviews: [],
  },
];
export const BANNER = [
  {
    id: 1,
    name: "Ceramic Vase",
    images: [
      "/banner.jpg",
      "/banner1.jpg?height=600&width=600",
      "/banner2.jpg?height=600&width=600",
    ],
  },
  // Add more products here
];
