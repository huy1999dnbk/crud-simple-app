import React, {useState, useCallback} from "react"
import TableUsers from "../components/TableUsers"
import {IUser} from "../utils/model"
import {Button, message, Popconfirm} from "antd"
import useDebounce from "../hook/useDebounce"
import usePagination from "../hook/usePagination"
import {useUsersLists} from "../hook/useUsersList"
import {useSearchParams} from "react-router-dom"
import {useDeleteUser} from "../hook/useUsersAction"
import AddUser from "../components/AddUser/AddUser"
import EditUser from "../components/EditUser/EditUser"
import ModalForm from "../components/ModalForm"
const Users: React.FC = () => {
  const [dataUserWillBeRemove, setDataUserWillBeRemove] = useState<IUser[]>([])
  const {q: querySearch, page, pageSize, usernameSort} = usePagination()
  const inputSearch = useDebounce(querySearch, 400)
  const {isLoading, data} = useUsersLists(inputSearch, Number(page), Number(pageSize), usernameSort)
  const [searchParams, setSearchParams] = useSearchParams()
  const mutationDeleteUser = useDeleteUser()
  const [idUserUpdated, setIdUserUpdated] = useState<number>(0)
  const [editUserModalOpen, setEditUserModalOpen] = useState<boolean>(false)
  const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false)
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

  const openModalAddUser = useCallback(() => {
    setAddUserModalOpen(true)
  }, [addUserModalOpen, setAddUserModalOpen])

  const closeModal = useCallback(() => {
    setEditUserModalOpen(false)
    setAddUserModalOpen(false)
  }, [setEditUserModalOpen, editUserModalOpen, setAddUserModalOpen, addUserModalOpen])

  const getIdUserUpdated = useCallback(
    (id: number) => {
      setIdUserUpdated(id)
      setEditUserModalOpen(true)
    },
    [idUserUpdated, setIdUserUpdated]
  )

  // useEffect(() => {
  //   const handleTabClose = (event: any) => {
  //     event.preventDefault()

  //     console.log("beforeunload event triggered")

  //     return (event.returnValue = "Are you sure you want to exit?")
  //   }

  //   window.addEventListener("beforeunload", handleTabClose)

  //   return () => {
  //     window.removeEventListener("beforeunload", handleTabClose)
  //   }
  // }, [])

  return (
    <div>
      <h1>Users list</h1>
      <div>
        <form>
          <label htmlFor="username">Search User</label>
        </form>
        <input value={querySearch} onChange={handleSearch} type="text" placeholder="Search in here" />
        <Button type="primary" onClick={openModalAddUser}>
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
        handleUpdateUser={getIdUserUpdated}
        getUsersWillBeRemove={getUserWillBeRemove}
        loading={isLoading}
        total={data?.count}
      />
      <ModalForm handleClose={closeModal} isOpen={editUserModalOpen} title="Edit">
        <EditUser idUserUpdated={idUserUpdated} setEditUserModalOpen={setEditUserModalOpen} />
      </ModalForm>
      <ModalForm handleClose={closeModal} isOpen={addUserModalOpen} title="Add">
        <AddUser setAddUserModalOpen={setAddUserModalOpen} />
      </ModalForm>
    </div>
  )
}

export default Users
