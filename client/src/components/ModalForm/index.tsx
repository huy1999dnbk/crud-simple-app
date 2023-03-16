import React from "react"
import {Modal} from "antd"
interface IModalForm {
  children?: React.ReactNode
  isOpen: boolean
  title: string
  handleClose: () => void
}

const ModalForm = ({children, handleClose, isOpen, title}: IModalForm) => {
  return (
    <>
      <Modal footer={<></>} title={title} centered open={isOpen} onCancel={handleClose} destroyOnClose={true}>
        {children}
      </Modal>
    </>
  )
}

export default ModalForm
