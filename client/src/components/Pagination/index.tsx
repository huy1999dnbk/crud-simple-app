import React, {useCallback} from "react"
import {Pagination} from "antd"
interface IPagination {
  total: number
  current: number
  pageSize: number
  handlePageChange: (page: number, pageSize: number) => void
}
const PaginationComponent: React.FC<IPagination> = (props: IPagination) => {
  const onChange = useCallback(
    (page: number, pageSize: number) => {
      props.handlePageChange(page, pageSize)
    },
    [props.handlePageChange]
  )
  return <Pagination current={props.current} defaultPageSize={10} total={props.total} pageSize={props.pageSize} onChange={onChange} />
}

export default PaginationComponent
