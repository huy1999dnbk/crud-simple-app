import {useMutation, useQueryClient} from "react-query"

import userApiService from "../apis/usersApiServices"
export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (args: number | number[]) => userApiService.deleteUser(args),
    onSuccess: () => {
      queryClient.invalidateQueries("users")
    },
  })
}

export function useAddUser(cb: () => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: any) => userApiService.addUser(user),
    onSuccess: () => {
      cb()
      queryClient.invalidateQueries("users")
    },
  })
}
