import {API_URL} from "../utils/constants"
import axios from "axios"
import {IUserAction} from "../utils/model"
class UserApiServices {
  constructor(private readonly url: string = API_URL.dn0_url) {}
  getUsers(keyword: string, page: number, pageSize: number, usernameSort: string) {
    return axios
      .get(`${this.url}/users?take=${pageSize}&page=${page}&keyword=${keyword}&sorts[1].[field]=username&sorts[1].[direction]=${usernameSort}`)
      .then((response) => response.data)
  }
  deleteUser(args: number | number[]) {
    return axios
      .delete(`${this.url}/users`, {
        data: {
          ids: typeof args === "number" ? [args] : args,
        },
      })
      .then((response) => response.data)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addUser(user: IUserAction) {
    return axios
      .post(`${this.url}/users`, {
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
      })
      .then((response) => {
        return response.data
      })
  }
  getUserById(id: number) {
    return axios.get(`${this.url}/users/${id}`).then((response) => response.data)
  }
  updateUser(userInfo: Partial<IUserAction & {id: number}>) {
    return axios
      .put(`${this.url}/users`, {
        username: userInfo.username,
        email: userInfo.email,
        lastName: userInfo.lastName,
        dob: userInfo.dob,
        id: userInfo.id,
        firstName: userInfo.firstName,
      })
      .then((response) => {
        return response.data
      })
  }
}

const userApiService = new UserApiServices()
export default userApiService
