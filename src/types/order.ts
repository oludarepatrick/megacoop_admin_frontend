export type OrderStat = {
  total_delivered_orders: number
  total_pending_orders: number
  total_revenue: number
}

export type OrderList = {
  id: number
  user_id: number
  order_id: number
  items: {
    price: string, 
    quantity: number, 
    product_id: number, 
    product_name: string
    images: string[]
  }[]
  sub_total: string
  vat: string
  delivery_fee: string
  total_amount: string
  status: "pending" | "declined" | "completed"
  created_at: string
  buyer: {id: number, firstname: string, lastname: string, email: string, phone: string}
}

export type OrderListResponse = {
    current_page: number
    data: OrderList[]
    last_page: number
    per_page: number
    total: number,
}
