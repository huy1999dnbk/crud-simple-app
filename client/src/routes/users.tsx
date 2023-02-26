import React, {useMemo, useState, useEffect} from "react"
import TableUsers from "../components/TableUsers"
import {DUMMY_DATA} from "../utils/data"
import {User} from "../utils/model"
interface DataTypeUser extends User {
  key: React.Key
}

const DATA = DUMMY_DATA.map((user, id: number) => ({
  ...user,
  key: id,
}))

const Users: React.FC = () => {
  const [dataUser, setData] = useState<DataTypeUser[]>(DATA)

  const handleDeleteOneUser = (key: React.Key) => {
    console.log(key)
  }

  return (
    <div>
      <h1>Users list</h1>
      <div>
        <form>
          <label htmlFor="username">Search User</label>
          <input id="username" type="text" placeholder="Search in here" />
        </form>
      </div>
      <TableUsers dataUser={dataUser} handleDeleteOneUser={handleDeleteOneUser} />
    </div>
  )
}

export default Users
