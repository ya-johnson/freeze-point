import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import DOMPurify from 'dompurify'


  const createHtml = (html) => {
    const postContent = stateToHTML(convertFromRaw(JSON.parse(html)))
    return {  __html: DOMPurify.sanitize(postContent) }
  }


  export default createHtml