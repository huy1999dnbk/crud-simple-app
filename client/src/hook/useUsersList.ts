import {useQuery} from "react-query"
import userApiService from "../apis/usersApiServices"
function fetchUsers(keyword: string, page: number, pageSize: number) {
  return userApiService.getUsers(keyword, page, pageSize)
}

export function useUsersLists(keyword: string, page: number, pageSize: number) {
  return useQuery({
    queryKey: ["users", keyword, page, pageSize],
    queryFn: () => fetchUsers(keyword, page, pageSize),
  })
}
