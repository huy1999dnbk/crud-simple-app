import axios from "axios"
import {useQuery} from "react-query"
import {API_URL} from "../utils/constants"

function fetchUsers(keyword: string, page: number, pageSize: number) {
  return axios.get(`${API_URL.dn0_url}users?take=${pageSize}&page=${page}&keyword=${keyword}`).then((response) => response.data)
}

export function useUsersLists(keyword: string, page: number, pageSize: number) {
  return useQuery({
    queryKey: [keyword, page, pageSize],
    queryFn: () => fetchUsers(keyword, page, pageSize),
  })
}
