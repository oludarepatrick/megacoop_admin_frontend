export type TransactionStatus= "pending" | "approved" | "denied";

export type TransactionList = {
  id: number
  user_id: number
  type: string
  amount: number
  reference: string
  description: string
  status: TransactionStatus
  created_at: string
  user:{
    first_name: string,
    middle_name: string
    last_name: string
    phone: string
    email: string
  }
}
  
export type TransactionResponse = {
  current_page: number
  data: TransactionList[]
  last_page: number
  per_page: number
  total: number,
}
