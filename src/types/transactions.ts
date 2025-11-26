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

export type WithdrawalList = {
  id: number
  user_id: number
  type: string
  balance_b4: string
  amount: number
  reference: string
  description: string
  status: "pending" | "approved" | "denied" | "paid";
  created_at: string
  account_name: string
  account_no: string
  bank: string | null
  user:{
    first_name: string,
    middle_name: string
    last_name: string
    phone: string
    email: string
  }
}

export type WithdrawalResponse = {
  current_page: number
  data: WithdrawalList[]
  last_page: number
  per_page: number
  total: number,
}
