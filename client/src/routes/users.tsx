import React, {useState, useMemo, useCallback, useEffect} from "react"
import TableUsers from "../components/TableUsers"
import {IUser, IUserAction} from "../utils/model"
import {Button, message, Popconfirm, Modal, Form} from "antd"
import useDebounce from "../hook/useDebounce"
import usePagination from "../hook/usePagination"
import {useUsersLists} from "../hook/useUsersList"
import {useSearchParams} from "react-router-dom"
import {useDeleteUser, useAddUser} from "../hook/useUsersAction"
import AddUser from "../components/AddUser/AddUser"
import EditUser from "../components/EditUser/EditUser"
import {useUpdateUser} from "../hook/useUsersAction"
const Users: React.FC = () => {
  const [dataUserWillBeRemove, setDataUserWillBeRemove] = useState<IUser[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [typeActionUser, setTypeActionUser] = useState<string>("")
  const {q: querySearch, page, pageSize} = usePagination()
  const inputSearch = useDebounce(querySearch, 400)
  const {isLoading, data} = useUsersLists(inputSearch, Number(page), Number(pageSize))
  const [searchParams, setSearchParams] = useSearchParams()
  const mutationDeleteUser = useDeleteUser()
  const mutationUpdateUser = useUpdateUser(() => setModalOpen(false))
  const mutationAddUser = useAddUser(() => setModalOpen(false))
  const [idUserUpdated, setIdUserUpdated] = useState<number>(0)
  const [editUser, setEditUser] = useState<boolean>(false)
  const handleDeleteOneUser = useCallback((key: number) => {
    mutationDeleteUser.mutate(key)
  }, [])
  const getUserWillBeRemove = useCallback(
    (data: IUser[]) => {
      setDataUserWillBeRemove(data)
    },
    [setDataUserWillBeRemove]
  )
  const deleteMultipleUsers = () => {
    const listKeyDeleted = dataUserWillBeRemove.map((user) => user.id)
    mutationDeleteUser.mutate(listKeyDeleted)
    setDataUserWillBeRemove([])
  }

  const confirm = useCallback(() => {
    if (dataUserWillBeRemove.length === 0) {
      message.warning("please choose at least one user")
      return
    }
    deleteMultipleUsers()
    message.success("success")
  }, [dataUserWillBeRemove])

  const cancel = useCallback(() => {
    message.error("delete action is cancelled")
  }, [])

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      searchParams.set("keyword", e.target.value.trim())
      searchParams.delete("page")
      searchParams.delete("pageSize")
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const openModal = useCallback(() => {
    setModalOpen(true)
    setTypeActionUser("Add")
  }, [typeActionUser])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setTypeActionUser("")
  }, [idUserUpdated])

  const titleModal = useMemo(() => (typeActionUser === "Add" ? "Add user" : typeActionUser === "Edit" ? "Edit User" : null), [typeActionUser])
  const handleUpdateUser = useCallback(
    (id: number) => {
      setIdUserUpdated(id)
      setModalOpen(true)
      setTypeActionUser("Edit")
    },
    [idUserUpdated, typeActionUser, setIdUserUpdated]
  )

  const onSubmit = useCallback(
    (user: IUserAction) => {
      if (typeActionUser === "Add") {
        mutationAddUser.mutate(user)
      }
      if (typeActionUser === "Edit") {
        console.log(user)
      }
    },
    [typeActionUser, setIdUserUpdated, idUserUpdated]
  )

  useEffect(() => {
    const handleTabClose = (event: any) => {
      event.preventDefault()

      console.log("beforeunload event triggered")

      return (event.returnValue = "Are you sure you want to exit?")
    }
    if (modalOpen) {
      window.addEventListener("beforeunload", handleTabClose)

      return () => {
        window.removeEventListener("beforeunload", handleTabClose)
      }
    }
  }, [modalOpen])

  return (
    <div>
      <h1>Users list</h1>
      <div>
        <form>
          <label htmlFor="username">Search User</label>
        </form>
        <input value={querySearch} onChange={handleSearch} type="text" placeholder="Search in here" />
        <Button type="primary" onClick={openModal}>
          Add User
        </Button>
        <Popconfirm title="Delete the task" description="Are you sure to delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      </div>
      {mutationDeleteUser.isLoading && <span>Deleting ........</span>}
      <TableUsers
        dataUser={data?.data}
        handleDeleteOneUser={handleDeleteOneUser}
        handleUpdateUser={handleUpdateUser}
        getUsersWillBeRemove={getUserWillBeRemove}
        loading={isLoading}
        total={data?.count}
      />
      <Modal
        title={titleModal}
        centered
        open={modalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="form-action" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        {typeActionUser === "Add" ? (
          <AddUser onSubmit={onSubmit} />
        ) : typeActionUser === "Edit" ? (
          <EditUser idUserUpdated={idUserUpdated} onSubmit={onSubmit} />
        ) : null}
      </Modal>
    </div>
  )
}

export default Users
