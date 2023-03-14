export interface IUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  dob: string
  isActive: boolean
  createdAt: "2023-03-04T09:12:05.608Z"
  updatedAt: "2023-03-04T09:12:05.608Z"
  fullName: string
  age: number | null
}

export interface IUserAction {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  dob: string
}
