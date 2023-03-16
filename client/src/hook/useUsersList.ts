import {useQuery} from "react-query"
import userApiService from "../apis/usersApiServices"
function fetchUsers(keyword: string, page: number, pageSize: number, usernameSort: string) {
  return userApiService.getUsers(keyword, page, pageSize, usernameSort)
}

export function useUsersLists(keyword: string, page: number, pageSize: number, usernameSort: string) {
  return useQuery({
    queryKey: ["users", keyword, page, pageSize, usernameSort, usernameSort],
    queryFn: () => fetchUsers(keyword, page, pageSize, usernameSort),
  })
}
