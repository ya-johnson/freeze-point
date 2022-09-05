const spliceToChunks = (arr, size) => {
  const arrCopy = [...arr]
  const res = []
  while (arrCopy.length > 0) {
      const chunk = arrCopy.splice(0, size)
      res.push(chunk)
  }
  return res
}


export { 
  spliceToChunks 
}