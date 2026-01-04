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

export type CreditList = {
    id: number
    user_id: number
    product_id: number
    product_name: string
    product_price: string
    repayment_months: number
    interest_amount: string
    monthly_due: string
    balance: string
    price: string
    status: "ongoing" | "completed"
    created_at: string
    user: {
        first_name: string
        middle_name: string
        last_name: string
        email: string
        phone: string
    }
    meta: {
      total_payable: string
    }
}

export type ProductListResponse = {
  current_page: number
  data: ProductList[]
  last_page: number
  per_page: number
  total: number,
}

export type CreditListResponse = {
  current_page: number
  data: CreditList[]
  last_page: number
  per_page: number
  total: number,
}