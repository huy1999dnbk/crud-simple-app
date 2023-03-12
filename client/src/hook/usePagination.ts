import {useSearchParams} from "react-router-dom"

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return {
    q: searchParams.get("keyword") || "",
    page: searchParams.get("page") || 1,
    pageSize: searchParams.get("pageSize") || 10,
  }
}

export default usePagination
