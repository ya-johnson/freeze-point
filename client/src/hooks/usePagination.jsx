import { useState, useEffect } from 'react'


const usePagination = (getItems, arg) => {

  const [page, setPage] = useState()
  const [total, setTotal] = useState()
  const [pages, setPages] = useState()
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(true)

  const makePages = (pagesCount) => {
    const pages = []
    for (let i=0; i < pagesCount; i++) {
      pages.push(i + 1)
    }
    return pages
  }

  const onPageChange = async () => {
    setLoading(true)
    const paginate = arg ? await getItems(arg, page) : await getItems(page)
    setPage(paginate.page)
    setPages(makePages(paginate.pages))
    setTotal(paginate.total)
    setPosts(paginate.docs)
    setLoading(false)
  }


  useEffect(() => {
    onPageChange()
  }, [page, arg])


  return { page, setPage, total, pages, posts, setPosts, loading }
}


export default usePagination