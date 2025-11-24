import type { User, CreateUserInput, UserResponse } from "@/types/User"

// Mock data
const MOCK_USERS: User[] = [
  {
    id: "00001",
    first_name: "Christine",
    middle_name: "",
    last_name: "Brooks",
    email: "Brooks@gmail.com",
    phone: "07068945678",
    role: "Account Clerk",
    status: "active",
  },
  {
    id: "00002",
    first_name: "Ninah",
    middle_name: "",
    last_name: "Dave",
    email: "Ninah@gmail.com",
    phone: "09034515353",
    role: "Customer Service",
    status: "inactive",
  },
  {
    id: "00003",
    first_name: "Jerry",
    middle_name: "",
    last_name: "Smith",
    email: "Jerry@gmail.com",
    phone: "08022334455",
    role: "Manager",
    status: "active",
  },
  {
    id: "00004",
    first_name: "Arthur",
    middle_name: "",
    last_name: "King",
    email: "Arthur@gmail.com",
    phone: "09088776655",
    role: "Sales",
    status: "active",
  },
  {
    id: "00005",
    first_name: "Lara",
    middle_name: "",
    last_name: "James",
    email: "Lara@gmail.com",
    phone: "08123456789",
    role: "Marketing",
    status: "inactive",
  },
]

export const fetchUsers = async (page = 1, search = "", status = "all"): Promise<UserResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  let filteredUsers = [...MOCK_USERS]

  if (status !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.status === status)
  }

  if (search) {
    const lowerSearch = search.toLowerCase()
    filteredUsers = filteredUsers.filter(
      (user) => [user.first_name, user.middle_name, user.last_name].join(" ").toLowerCase().includes(lowerSearch) || user.email.toLowerCase().includes(lowerSearch),
    )
  }

  return {
    data: filteredUsers,
    meta: {
      total: filteredUsers.length,
      page,
      limit: 10,
      totalPages: Math.ceil(filteredUsers.length / 10),
    },
  }
}

export const createUser = async (userData: CreateUserInput): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    id: Math.floor(Math.random() * 10000)
      .toString()
      .padStart(5, "0"),
    ...userData,
    status: "active",
  }

  // In a real app, we would add this to the database
  // MOCK_USERS.push(newUser);

  return newUser
}
