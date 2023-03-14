import {useMutation, useQueryClient, useQuery} from "react-query"
import {IUserAction} from "../utils/model"
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
    mutationFn: (user: IUserAction) => userApiService.addUser(user),
    onSuccess: () => {
      cb()
      queryClient.invalidateQueries("users")
    },
  })
}

export function useGetUserById(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userApiService.getUserById(id),
    refetchInterval: false,
  })
}

export function useUpdateUser(cb: () => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: Partial<IUserAction & {id: number}>) => userApiService.updateUser(user),
    onSuccess: () => {
      cb()
      queryClient.invalidateQueries("users")
    },
  })
}
