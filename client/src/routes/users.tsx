import React, {useState, useMemo, useCallback, useEffect} from "react"
import TableUsers from "../components/TableUsers"
import {IUser} from "../utils/model"
import {Button, message, Popconfirm} from "antd"
import useDebounce from "../hook/useDebounce"
import usePagination from "../hook/usePagination"
import {useUsersLists} from "../hook/useUsersList"
import {useSearchParams} from "react-router-dom"
import {useDeleteUser} from "../hook/useUsersAction"
const Users: React.FC = () => {
  const [dataUserWillBeRemove, setDataUserWillBeRemove] = useState<IUser[]>([])
  const {q: querySearch, page, pageSize} = usePagination()
  const inputSearch = useDebounce(querySearch, 400)
  const {isLoading, data} = useUsersLists(inputSearch, Number(page), Number(pageSize))
  const [searchParams, setSearchParams] = useSearchParams()
  const mutationDeleteUser = useDeleteUser()
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
  return (
    <div>
      <h1>Users list</h1>
      <div>
        <form>
          <label htmlFor="username">Search User</label>
        </form>
        <input value={querySearch} onChange={handleSearch} type="text" placeholder="Search in here" />
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
        getUsersWillBeRemove={getUserWillBeRemove}
        loading={isLoading}
        total={data?.count}
      />
    </div>
  )
}

export default Users
