import React from "react"
import {Pagination} from "antd"

enum PaginationInfo {
  defaultCurrent = 1,
  defaultPageSize = 20,
}

interface Pagination {
  totalItems: number
  handlePageChange: (page: number, pageSize: number) => void
}

const PaginationComponent: React.FC<Pagination> = (props: Pagination) => {
  const handlePageClick = (page: number, pageSize: number) => {
    props.handlePageChange(page, pageSize)
  }

  return (
    <>
      <Pagination
        total={props.totalItems}
        defaultCurrent={PaginationInfo.defaultCurrent}
        pageSize={PaginationInfo.defaultPageSize}
        onChange={handlePageClick}
      />
    </>
  )
}

export default PaginationComponent
