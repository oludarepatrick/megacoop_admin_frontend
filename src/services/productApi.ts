import axios from "@/lib/axiosInstance";
import type { ProductListResponse } from "@/types/product";
import type {
  EditProductFormData,
  ProductFormData,
} from "@/validations/product-schema";

export const productAPI = {
  getProductList: async (page: number): Promise<ProductListResponse> => {
    const response = await axios.get(`/admin/products?page=${page}`);
    return response.data;
  },
  //   createProduct: async(data: ProductFormData) => {
  //     const response = await axios.post("admin/product-save", data);
  //     return response.data
  //   },
  createProduct: async (data: ProductFormData) => {
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
    const formData = new FormData();

    // Add null checks and type coercion for optional fields
    if (data.product_name) formData.append("product_name", data.product_name);
    if (data.product_category)
      formData.append("product_category", data.product_category);
    if (data.price) formData.append("price", data.price);
    if (data.available_stock)
      formData.append("available_stock", data.available_stock);
    if (data.full_description)
      formData.append("full_description", data.full_description);
    if (data.delivery_fee) formData.append("delivery_fee", data.delivery_fee);
    if (data.status) formData.append("status", data.status); // Use the actual status from data

    if (data.size) formData.append("size", data.size);
    if (data.color) formData.append("color", data.color);
    if (data.seller_name) formData.append("seller_name", data.seller_name);

    // Append images only if they exist and are not empty
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    if (data.video) {
      formData.append("video", data.video);
    }

    // Use PUT or PATCH for updates, not POST
    const response = await axios.post(
      `/admin/products/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  deleteProduct: async (id: number) =>{
    const response = await axios.delete(`admin/products/${id}`);
    return response.data;
  },

  notifyUser: async (id: number) =>{
    const response = await axios.post(`admin/products/notify-users/${id}`);
    return response.data;
  }
};