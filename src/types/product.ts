export type ProductStatus = "pending" | "active" | "inactive";

export type ProductList = {
    product_id: number
    product_name: string
    product_category: string
    available_stock: number
    images: string[]
    video: string | null
    brief_description: string
    full_description: string
    size: string
    color: string
    price: string
    bulk_price: string
    seller_id: number
    delivery_counter: number
    delivery_fee: string
    status: ProductStatus
    created_at: string
    seller: {
        seller_id: number
        name: string
        email: string
        phone: string
        address: string
        store_url: string
        ratings: string
        completed_sales: number
        trust_score: string
        created_at: string
    }
}

export type ProductListResponse = {
  current_page: number
  data: ProductList[]
  last_page: number
  per_page: number
  total: number,
}