import React from "react"
import {Table} from "antd"
import type {ColumnsType} from "antd/es/table"
import {User} from "../../utils/model"
import {Checkbox, Popconfirm} from "antd"
import type {CheckboxChangeEvent} from "antd/es/checkbox"
interface DataTypeUser extends User {
  key: React.Key
}

interface TableUsers<T> {
  dataUser: T[]
  handleDeleteOneUser: (key: React.Key) => void
}

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataTypeUser[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows)
  },
  getCheckboxProps: (record: DataTypeUser) => ({}),
}

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`)
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
