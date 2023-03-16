import React, {useMemo, useCallback, Dispatch} from "react"
import FormData from "../FormData"
import {IUserAction} from "../../utils/model"
import {useGetUserById} from "../../hook/useUsersAction"
import {useUpdateUser} from "../../hook/useUsersAction"
interface IEditUser {
  idUserUpdated: number
  setEditUserModalOpen: Dispatch<boolean>
}
const EditUser: React.FC<IEditUser> = (props: IEditUser) => {
  const {data, isLoading, isFetching} = useGetUserById(props.idUserUpdated)
  const mutationUpdateUser = useUpdateUser(() => props.setEditUserModalOpen(false))
  const defaultDataForm: IUserAction = useMemo(() => {
    return {
      username: data?.username,
      password: data?.password,
      email: data?.email,
      firstName: data?.firstName,
      lastName: data?.lastName,
      dob: data?.dob,
    }
  }, [data])
  const onSubmit = useCallback(
    (user: IUserAction) => {
      const {password, ...rest} = user
      const editUserData: Partial<IUserAction & {id: number}> = {
        ...rest,
        id: props.idUserUpdated,
      }
      mutationUpdateUser.mutate(editUserData)
    },
    [props.idUserUpdated]
  )

  if (isLoading) return <h3>loading....</h3>

  return (
    data &&
    !isFetching && (
      <div>
        <FormData onSubmit={onSubmit} defaultDataForm={defaultDataForm} loadingButtonSubmit={mutationUpdateUser.isLoading} />
      </div>
    )
  )
}

export default EditUser
