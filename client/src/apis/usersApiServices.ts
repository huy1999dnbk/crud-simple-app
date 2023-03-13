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
}

const userApiService = new UserApiServices()
export default userApiService
