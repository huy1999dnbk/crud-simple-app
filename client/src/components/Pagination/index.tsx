import React, {useCallback} from "react"
import {Pagination} from "antd"
interface IPagination {
  total: number
  current: number
  pageSize: number
  handlePageChange: (page: number) => void
  onPageSizeChange: (current: number, size: number) => void
}
const PaginationComponent: React.FC<IPagination> = (props: IPagination) => {
  const handlePageSizeChange = useCallback((current: number, size: number) => {
    props.onPageSizeChange(current, size)
  }, [])

  const onChange = useCallback(
    (page: number) => {
      props.handlePageChange(page)
    },
    [props.handlePageChange]
  )
  return (
    <Pagination
      current={props.current}
      defaultPageSize={10}
      total={props.total}
      pageSize={props.pageSize}
      onShowSizeChange={handlePageSizeChange}
      onChange={onChange}
    />
  )
}

export default PaginationComponent
