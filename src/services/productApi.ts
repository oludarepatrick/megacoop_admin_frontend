import axios from "@/lib/axiosInstance";
import type { ProductListResponse } from "@/types/product";
import type { EditProductFormData, ProductFormData } from "@/validations/product-schema";

export const productAPI = {
  getProductList: async(page: number): Promise<ProductListResponse> => {
    const response = await axios.get(`/admin/products?page=${page}`)
    console.log(response, response.data)
    return response.data
  },
//   createProduct: async(data: ProductFormData) => {
//     const response = await axios.post("admin/product-save", data);
//     return response.data
//   },
  createProduct: async(data: ProductFormData) => {
    const formData = new FormData();
    
    formData.append("product_name", data.product_name);
    formData.append("product_category", data.product_category);
    formData.append("price", data.price);
    formData.append("available_stock", data.available_stock);
    formData.append("full_description", data.full_description);
    formData.append("delivery_fee", data.delivery_fee);
    formData.append("status", "active");
    
    if (data.size) formData.append("size", data.size);
    if (data.color) formData.append("color", data.color);
    if (data.seller_name) formData.append("seller_name", data.seller_name);
    
    // Append images as array
    data.images.forEach((image) => {
        formData.append("images[]", image);
    });
    
    if (data.video) {
        formData.append("video", data.video);
    }
    
    const response = await axios.post("admin/product-save", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
  },
  updateProduct: async (id: number, data: EditProductFormData) => {
    const response = await axios.post(`/admin/products/update/${id}`, data);
    return response.data
  }



}

// export const productAPI = {
//     getProductList: async(): Promise<ProductListResponse> => {
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         return fetchedData;
//     }
// }

// const fetchedData: ProductListResponse = {
//     "current_page": 1,
//     "data": [
//       {
//         "product_id": 1,
//         "product_name": "Fresh Tomatoes",
//         "product_category": "Groceries",
//         "available_stock": 120,
//         "images": [
//           "",
//           ""
//         ],
//         "video": null,
//         "brief_description": "Freshly harvested tomatoes for your everyday meals.",
//         "full_description": "These organic tomatoes are sourced from local farms and packed with nutrients perfect for cooking and salads.",
//         "size": "1kg pack",
//         "color": "Red",
//         "price": "1100.00",
//         "bulk_price": "1500.00",
//         "seller_id": 1,
//         "delivery_counter": 0,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-12-04T13:57:28.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       },
//       {
//         "product_id": 2,
//         "product_name": "Organic Apples",
//         "product_category": "Premium Fruits",
//         "available_stock": 80,
//         "images": [
//           "",
//           ""
//         ],
//         "video": null,
//         "brief_description": "Sweet and crisp organic apples.",
//         "full_description": "Our organic apples are grown without synthetic pesticides and handpicked for the best quality.",
//         "size": "1kg pack",
//         "color": "Red/Green",
//         "price": "2000.00",
//         "bulk_price": "2500.00",
//         "seller_id": 1,
//         "delivery_counter": 0,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-12-04T13:57:28.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       },
//       {
//         "product_id": 3,
//         "product_name": "Coffee Maker",
//         "product_category": "Home & Kitchen",
//         "available_stock": 50,
//         "images": [
//           ""
//         ],
//         "video": "",
//         "brief_description": "Automatic coffee maker with timer.",
//         "full_description": "Brew perfect coffee with this programmable coffee maker featuring multiple brew strengths and a 1.5L capacity.",
//         "size": "Medium",
//         "color": "Black",
//         "price": "20000.00",
//         "bulk_price": "25000.00",
//         "seller_id": 1,
//         "delivery_counter": 0,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-12-04T13:57:28.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       },
//       {
//         "product_id": 4,
//         "product_name": "Casual T-Shirt",
//         "product_category": "Fashion",
//         "available_stock": 200,
//         "images": [
//           "",
//           ""
//         ],
//         "video": null,
//         "brief_description": "Soft cotton casual T-shirt.",
//         "full_description": "A premium-quality cotton T-shirt for men and women. Breathable and durable, perfect for daily wear.",
//         "size": "M, L, XL",
//         "color": "White",
//         "price": "2000.00",
//         "bulk_price": "4500.00",
//         "seller_id": 1,
//         "delivery_counter": 5,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-12-04T13:57:28.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       },
//       {
//         "product_id": 5,
//         "product_name": "Wireless Headphones",
//         "product_category": "Tech Gadget",
//         "available_stock": 100,
//         "images": [
//           ""
//         ],
//         "video": "",
//         "brief_description": "Noise-cancelling wireless headphones.",
//         "full_description": "Experience premium sound with active noise cancellation and up to 20 hours of battery life.",
//         "size": "Adjustable",
//         "color": "Black",
//         "price": "2000.00",
//         "bulk_price": "18000.00",
//         "seller_id": 1,
//         "delivery_counter": 3,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-12-04T13:57:28.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       },
//       {
//         "product_id": 6,
//         "product_name": "Face Cream",
//         "product_category": "Beauty",
//         "available_stock": 150,
//         "images": [
//           ""
//         ],
//         "video": null,
//         "brief_description": "Moisturizing and skin-brightening face cream.",
//         "full_description": "A daily-use hydrating face cream that nourishes and brightens the skin for a smooth glow.",
//         "size": "50ml",
//         "color": "White",
//         "price": "2000.00",
//         "bulk_price": "3500.00",
//         "seller_id": 1,
//         "delivery_counter": 0,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-12-04T13:57:28.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       },
//       {
//         "product_id": 7,
//         "product_name": "Paint Brush Set",
//         "product_category": "Home Improvement",
//         "available_stock": 75,
//         "images": [
//           "",
//           ""
//         ],
//         "video": null,
//         "brief_description": "Durable paint brush set for all surfaces.",
//         "full_description": "This 5-piece paint brush set is designed for smooth application on walls, wood, and metal surfaces.",
//         "size": "5 pcs",
//         "color": "Wood & Silver",
//         "price": "2000.00",
//         "bulk_price": "6000.00",
//         "seller_id": 1,
//         "delivery_counter": 0,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-12-04T13:57:28.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       },
//       {
//         "product_id": 8,
//         "product_name": "Running Shoes",
//         "product_category": "Sports, Toys & Luggage",
//         "available_stock": 90,
//         "images": [
//           ""
//         ],
//         "video": "",
//         "brief_description": "Lightweight and durable running shoes.",
//         "full_description": "Designed for comfort and performance, these shoes feature breathable mesh and shock-absorbing soles.",
//         "size": "42, 43, 44",
//         "color": "Blue",
//         "price": "2000.00",
//         "bulk_price": "12000.00",
//         "seller_id": 1,
//         "delivery_counter": 0,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-12-04T13:57:28.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       },
//       {
//         "product_id": 10,
//         "product_name": "Red Apple Fruit",
//         "product_category": "Fruits",
//         "available_stock": 200,
//         "images": [
//           "",
//           "",
//           "",
//           "",
//           "",
//           ""
//         ],
//         "video": null,
//         "brief_description": "Organic Red Apple Fruit",
//         "full_description": "Organic Red Apple Fruit",
//         "size": "Medium",
//         "color": "Red",
//         "price": "1300.00",
//         "bulk_price": "5000.00",
//         "seller_id": 1,
//         "delivery_counter": 0,
//         "delivery_fee": "0.00",
//         "status": "active",
//         "created_at": "2025-10-29T13:41:06.000000Z",
//         "seller": {
//           "seller_id": 1,
//           "name": "Megacoop Market Places",
//           "email": "market@megacoop.org",
//           "phone": "08012345678",
//           "address": "Lagos, Ikeja",
//           "store_url": "https://megacoop.org/marketplace",
//           "ratings": "4.50",
//           "completed_sales": 200,
//           "trust_score": "0.00",
//           "created_at": "2025-12-04T13:57:28.000000Z",
//         }
//       }
//     ],
//     "last_page": 1,
//     "per_page": 20,
//     "total": 9

// }
