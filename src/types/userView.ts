export type UserViewStat = {
  active_users: number
  new_users_last_month: number
  total_user: number
}

export type AllUsers = {
  member_id: string
  uuid: string
  first_name: string
  middle_name: string
  last_name: string
  address: string
  phone: string
  whatsapp_no: string
  gender: string
  dob: string
  age_range: string
  email: string
  status: number 
}

export type AllUserListResponse = {
    current_page: number
    data: AllUsers[]
    last_page: number
    per_page: number
    total: number,
}

export type UserWallet = {
  id: number
  user_id: number
  account_number: string
  bank_name: string
  balance: string
  lock_balance: string
  status: string
}

export type WalletTransaction = {
  id: number
  user_id: number
  type: "debit" | "credit" | "withdrawal"
  balance_b4: string
  amount: string
  reference: string
  description: string
  status: "approved" | "pending" | "denied"
  denied_reason: string | null
  created_at: string
}

export type SingleUserResponse = {
  user: AllUsers
  wallet: UserWallet
  wallet_transactions: {
    current_page: number
    data: WalletTransaction[]
    last_page: number
    per_page: number
    total: number,
  }
}

