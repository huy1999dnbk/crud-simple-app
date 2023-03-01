import React from "react"
import {Table} from "antd"
import type {ColumnsType} from "antd/es/table"
import {User} from "../../utils/model"
import {Popconfirm, Checkbox} from "antd"
import type {CheckboxChangeEvent} from "antd/es/checkbox"
interface DataTypeUser extends User {
  key: React.Key
}

interface TableUsers<T> {
  dataUser: T[]
  handleDeleteOneUser: (key: React.Key) => void
  getUserWillBeRemove: (data: DataTypeUser[]) => void
}

const onChange = (e: CheckboxChangeEvent, key: React.Key) => {
  console.log(`checked = ${e.target.checked} at ${key}`)
}

const TableUsers: React.FC<TableUsers<DataTypeUser>> = (props: TableUsers<DataTypeUser>) => {
  const handleDetete = (key: React.Key) => {
    props.handleDeleteOneUser(key)
  }

  const columns: ColumnsType<DataTypeUser> = [
    {
      title: "No.",
      dataIndex: "_id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      sorter: (a: DataTypeUser, b: DataTypeUser) => a.name.length - b.name.length,
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a: DataTypeUser, b: DataTypeUser) => a.age - b.age,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: (isActive: boolean, record: DataTypeUser) => (
        <Checkbox defaultChecked={isActive} onChange={(e: CheckboxChangeEvent) => onChange(e, record.key)} />
      ),
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: {key: React.Key}) =>
        props.dataUser.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDetete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ]

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataTypeUser[]) => {
      props.getUserWillBeRemove(selectedRows)
    },
  }

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={props.dataUser}
      />
    </div>
  )
}

export default TableUsers
