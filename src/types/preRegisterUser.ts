export type Status= "pending" | "completed" ;


export type NewUserList = {
  id: number
  fullname: string
  phone: string
  email: string
  status: Status
  created_at: string
}

export type NewUserListResponse = {
  current_page: number
  data: NewUserList[]
  last_page: number
  per_page: number
  total: number,
}