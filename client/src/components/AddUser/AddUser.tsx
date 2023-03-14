import React from "react"
import FormData from "../FormData"
import type {FormInstance} from "antd/es/form"
interface IAddUser {
  onSubmit: (data: any) => void
  formRef: React.RefObject<FormInstance>
}
const AddUser: React.FC<IAddUser> = (props: IAddUser) => {
  return (
    <div>
      <FormData onSubmit={props.onSubmit} formRef={props.formRef} />
    </div>
  )
}

export default AddUser
