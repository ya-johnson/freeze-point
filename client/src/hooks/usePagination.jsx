import { useState, useEffect } from 'react'


const usePagination = (getItems) => {

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState()
  const [pages, setPages] = useState()
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(true)

  const makePages = (pagesCount) => {
    const pages = []
    for (let i=0; i <= pagesCount; i++) {
      pages.push(i + 1)
    }
    return pages
  }

  const onPageChange = async () => {
    setLoading(true)
    const paginate = await getItems(page)
    setPage(paginate.page + 1)
    setPages(makePages(paginate.pages))
    setTotal(paginate.total)
    setPosts(paginate.docs)
    setLoading(false)
  }


  useEffect(() => {
    onPageChange()
  }, [page])


  return { page, setPage, total, pages, posts, loading }
}


export default usePagination