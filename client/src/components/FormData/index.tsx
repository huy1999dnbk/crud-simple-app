import React, {useCallback} from "react"
import {Form, Input, DatePicker} from "antd"
import dayjs from "dayjs"
interface IFormData {
  onSubmit: (data: any) => void
}
const FormData: React.FC<IFormData> = (props: IFormData) => {
  const onFinish = useCallback((values: any) => {
    values.dob = dayjs(values.dob).toISOString()
    props.onSubmit(values)
  }, [])

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }, [])

  return (
    <div>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        id="form-action"
      >
        <Form.Item label="Username" name="username" rules={[{required: true, message: "Please input your username!"}]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{required: true, message: "Please input your password!"}]}>
          <Input.Password />
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
      </Form>
    </div>
  )
}

export default FormData
