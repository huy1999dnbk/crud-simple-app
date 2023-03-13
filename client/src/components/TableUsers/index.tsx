import React, {memo, useCallback, useMemo} from "react"
import {Table, Button} from "antd"
import type {ColumnsType} from "antd/es/table"
import {IUser} from "../../utils/model"
import {Popconfirm, Checkbox} from "antd"
import type {CheckboxChangeEvent} from "antd/es/checkbox"
import PaginationComponent from "../Pagination"
import {useSearchParams} from "react-router-dom"
import usePagination from "../../hook/usePagination"

export interface TableUsers<T> {
  dataUser: T[] | []
  loading: boolean
  total: number
  handleDeleteOneUser: (key: number) => void
  handleUpdateUser: (user: IUser) => void
  getUsersWillBeRemove: (data: IUser[]) => void
}

const onChange = (e: CheckboxChangeEvent, key: React.Key) => {
  console.log(`checked = ${e.target.checked} at ${key}`)
}

const PopConfirmDelete = memo(({keyUser, handleDetete}: {keyUser: number; handleDetete: (key: number) => void}) => {
  const deleteOneUser = useCallback(() => {
    handleDetete(keyUser)
  }, [keyUser, handleDetete])
  return (
    <Popconfirm title="Sure to delete?" onConfirm={deleteOneUser}>
      <a>Delete</a>
    </Popconfirm>
  )
})

const CheckBoxUser = memo(
  ({
    keyUser,
    defaultChecked,
    onChangeActive,
  }: {
    keyUser: React.Key
    defaultChecked: boolean
    onChangeActive: (e: CheckboxChangeEvent, keyUser: React.Key) => void
  }) => {
    const onChange = useCallback(
      (e: CheckboxChangeEvent) => {
        onChangeActive(e, keyUser)
      },
      [keyUser, onChangeActive]
    )
    return <Checkbox defaultChecked={defaultChecked} onChange={onChange} />
  }
)

const EditButton = memo(({user, handleUpdateUser}: {user: IUser; handleUpdateUser: (user: IUser) => void}) => {
  const updateUser = useCallback(() => {
    handleUpdateUser(user)
  }, [])
  return (
    <Button type="default" onClick={updateUser}>
      Edit
    </Button>
  )
})

const TableUsersComponent: React.FC<TableUsers<IUser>> = (props: TableUsers<IUser>) => {
  const {handleDeleteOneUser, getUsersWillBeRemove} = props
  const [searchParams, setSearchParams] = useSearchParams()
  const {pageSize, page} = usePagination()
  const pageSizeCurrent = useMemo(() => Number(pageSize), [pageSize])
  const current = useMemo(() => Number(page), [page])
  const columns: ColumnsType<IUser> = [
    {
      title: "No.",
      dataIndex: "id",
      render: (id: number) => <a>{id}</a>,
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: (isActive: boolean, record: IUser) => {
        return <CheckBoxUser keyUser={record.id} defaultChecked={isActive} onChangeActive={onChange} />
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: IUser) =>
        props.dataUser.length >= 1 ? (
          <>
            <PopConfirmDelete keyUser={record.id} handleDetete={handleDeleteOneUser} />
            <EditButton user={record} handleUpdateUser={props.handleUpdateUser} />
          </>
        ) : null,
    },
  ]

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IUser[]) => {
      getUsersWillBeRemove(selectedRows)
    },
  }

  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      if (searchParams.has("page")) {
        searchParams.set("page", String(page))
      } else {
        searchParams.append("page", String(page))
      }
      if (searchParams.has("pageSize")) {
        searchParams.set("pageSize", String(pageSize))
      } else {
        searchParams.append("pageSize", String(pageSize))
      }
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const getKey = useCallback((record: IUser) => record.id, [])

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
          preserveSelectedRowKeys: true,
        }}
        columns={columns}
        dataSource={props.dataUser}
        pagination={false}
        loading={props.loading}
        rowKey={getKey}
      />
      <PaginationComponent handlePageChange={handlePageChange} pageSize={pageSizeCurrent} current={current} total={props.total} />
    </div>
  )
}

export default TableUsersComponent
