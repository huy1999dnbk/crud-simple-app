import React, {useCallback, useEffect} from "react"
import {Form, Input, DatePicker, Button} from "antd"
import type {FormInstance} from "antd/es/form"
import {IUserAction} from "../../utils/model"
import dayjs from "dayjs"
interface IFormData {
  onSubmit: (data: IUserAction) => void
  defaultDataForm?: IUserAction
  loadingButtonSubmit: boolean
}
const FormData: React.FC<IFormData> = (props: IFormData) => {
  const {defaultDataForm, loadingButtonSubmit} = props
  const formRef = React.useRef<FormInstance>(null)
  const onFinish = useCallback((values: IUserAction) => {
    values.dob = dayjs(values.dob).toISOString()
    props.onSubmit(values)
  }, [])

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }, [])
  useEffect(() => {
    if (defaultDataForm) {
      formRef.current?.setFieldsValue({
        username: defaultDataForm?.username,
        email: defaultDataForm?.email,
        firstName: defaultDataForm?.firstName,
        lastName: defaultDataForm?.lastName,
        dob: dayjs(defaultDataForm?.dob),
      })
    }
  }, [defaultDataForm])

  return (
    <div>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        id="form-action"
        ref={formRef}
      >
        <Form.Item label="Username" name="username" rules={[{required: true, message: "Please input your username!"}]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              validator: (_, value) => (defaultDataForm || (value && !defaultDataForm) ? Promise.resolve() : Promise.reject(new Error("invalid password"))),
            },
          ]}
        >
          <Input.Password disabled={defaultDataForm ? true : false} />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{required: true, message: "Please input your email!", type: "email"}]}>
          <Input />
        </Form.Item>

        <Form.Item label="First name" name="firstName" rules={[{required: true, message: "Please input your first name!"}]}>
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" rules={[{required: true, message: "Please input your last name!"}]}>
          <Input />
        </Form.Item>

        <Form.Item label="Date of birth" name="dob" rules={[{required: true, message: "Please input your last dob!"}]}>
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={{defaultValue: dayjs("00:00:00", "HH:mm:ss")}} />
        </Form.Item>
        <Button htmlType="submit" form="form-action" loading={loadingButtonSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default FormData
