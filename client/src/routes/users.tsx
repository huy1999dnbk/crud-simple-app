import React, {useState, useMemo} from "react"
import TableUsers from "../components/TableUsers"
import {DUMMY_DATA} from "../utils/data"
import {User} from "../utils/model"
import {Button, message, Popconfirm} from "antd"
import useDebounce from "../hook/useDebounce"
interface DataTypeUser extends User {
  key: React.Key
}

const DATA = DUMMY_DATA.map((user, id: number) => ({
  ...user,
  key: id,
}))

const Users: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("")
  const valueSearch = useDebounce(searchInput, 200)
  const [dataUser, setData] = useState<DataTypeUser[]>(DATA)
  const [dataUserWillBeRemove, setDataUserWillBeRemove] = useState<DataTypeUser[]>([])
  const handleDeleteOneUser = (key: React.Key) => {
    const tmpData: DataTypeUser[] = dataUser.filter((item) => item.key !== key)
    setData(tmpData)
  }

  const getUserWillBeRemove = (data: DataTypeUser[]) => {
    setDataUserWillBeRemove(data)
  }
  const deleteMultipleUsers = () => {
    const listKeyUserDeleted = dataUserWillBeRemove.map((item) => item.key)
    const newUsersList: DataTypeUser[] = dataUser.filter((item) => !listKeyUserDeleted.includes(item.key))
    setData(newUsersList)
    setDataUserWillBeRemove([])
  }

  const confirm = () => {
    if (dataUserWillBeRemove.length === 0) {
      message.warning("please choose at least one user")
      return
    }
    deleteMultipleUsers()
    message.success("success")
  }

  const cancel = () => {
    message.error("delete action is cancelled")
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value)
  }

  const dataSource = useMemo(() => {
    return dataUser.filter((user) => user.name.toLowerCase().includes(valueSearch.toLowerCase()))
  }, [valueSearch, dataUser])

  return (
    <div>
      <h1>Users list</h1>
      <div>
        <form>
          <label htmlFor="username">Search User</label>
        </form>
        <input onChange={handleSearch} id="username" type="text" placeholder="Search in here" value={searchInput} />
        <Popconfirm title="Delete the task" description="Are you sure to delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      </div>
      <TableUsers dataUser={dataSource} handleDeleteOneUser={handleDeleteOneUser} getUserWillBeRemove={getUserWillBeRemove} />
    </div>
  )
}

export default Users
