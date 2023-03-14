import React from "react"
import FormData from "../FormData"
import type {FormInstance} from "antd/es/form"
interface IAddUser {
  onSubmit: (data: any) => void
}
const AddUser: React.FC<IAddUser> = (props: IAddUser) => {
  return (
    <div>
      <FormData onSubmit={props.onSubmit} />
    </div>
  )
}

export default AddUser
