import React, {memo, useCallback, useMemo} from "react"
import {Table} from "antd"
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
  handleDeleteOneUser: (key: React.Key) => void
  getUsersWillBeRemove: (data: IUser[]) => void
}

const onChange = (e: CheckboxChangeEvent, key: React.Key) => {
  console.log(`checked = ${e.target.checked} at ${key}`)
}

const PopConfirmDelete = memo(({keyUser, handleDetete}: {keyUser: React.Key; handleDetete: (key: React.Key) => void}) => {
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
      title: "First Name",
      dataIndex: "firstName",
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
      render: (_, record: {id: React.Key}) => (props.dataUser.length >= 1 ? <PopConfirmDelete keyUser={record.id} handleDetete={handleDeleteOneUser} /> : null),
    },
  ]

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IUser[]) => {
      getUsersWillBeRemove(selectedRows)
    },
  }

  const handlePageSizeChange = useCallback(
    (current: number, size: number) => {
      searchParams.set("pageSize", String(size))
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const handlePageChange = useCallback(
    (pageChoosen: number) => {
      if (searchParams.has("page")) {
        searchParams.set("page", String(pageChoosen))
      } else {
        searchParams.append("page", String(pageChoosen))
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
        }}
        columns={columns}
        dataSource={props.dataUser}
        pagination={false}
        loading={props.loading}
        rowKey={getKey}
      />
      <PaginationComponent
        handlePageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSizeCurrent}
        current={current}
        total={props.total}
      />
    </div>
  )
}

export default TableUsersComponent
