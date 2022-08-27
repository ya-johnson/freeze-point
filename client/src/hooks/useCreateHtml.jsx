import { useState, useEffect } from 'react'
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import DOMPurify from 'dompurify'


const useCreateHtml = ({ postContent }) => {

  console.log( postContent)

  /*const [postHtml, setPostHtml] = useState()

  const createHtml = (html) => {
    const postContent = stateToHTML(convertFromRaw(JSON.parse(html)))
    setPostHtml({
      __html: DOMPurify.sanitize(postContent)
    })
  }

  useEffect(() => {
    console.log(postContent)
    createHtml(postContent)
  },[])


  return postHtml */
}


export default useCreateHtml