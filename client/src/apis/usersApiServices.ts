import {API_URL} from "../utils/constants"
import axios from "axios"
class UserApiServices {
  constructor(private readonly url: string = API_URL.dn0_url) {}
  getUsers(keyword: string, page: number, pageSize: number) {
    return axios.get(`${this.url}/users?take=${pageSize}&page=${page}&keyword=${keyword}`).then((response) => response.data)
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
  addUser(user: any) {
    console.log("user", user)
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
        console.log("response", response)
        return response.data
      })
  }
}

const userApiService = new UserApiServices()
export default userApiService
