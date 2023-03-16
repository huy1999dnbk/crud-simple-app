import React, {Dispatch, useCallback} from "react"
import FormData from "../FormData"
import {IUserAction} from "../../utils/model"
import {useAddUser} from "../../hook/useUsersAction"
interface IAddUser {
  setAddUserModalOpen: Dispatch<boolean>
}
const AddUser: React.FC<IAddUser> = (props: IAddUser) => {
  const mutationAddUser = useAddUser(() => props.setAddUserModalOpen(false))
  const onSubmit = useCallback((user: IUserAction) => {
    mutationAddUser.mutate(user)
  }, [])
  return (
    <div>
      <FormData onSubmit={onSubmit} loadingButtonSubmit={mutationAddUser.isLoading} />
    </div>
  )
}

export default AddUser
