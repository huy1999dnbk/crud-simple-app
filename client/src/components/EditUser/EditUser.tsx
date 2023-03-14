import React, {useMemo} from "react"
import FormData from "../FormData"
import {IUserAction} from "../../utils/model"
import {useGetUserById} from "../../hook/useUsersAction"
interface IEditUser {
  onSubmit: (data: IUserAction) => void
  idUserUpdated: number
}
const EditUser: React.FC<IEditUser> = (props: IEditUser) => {
  const {data} = useGetUserById(props.idUserUpdated)
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
  return (
    <div>
      <FormData onSubmit={props.onSubmit} defaultDataForm={defaultDataForm} />
    </div>
  )
}

export default EditUser
