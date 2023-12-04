import React, { useState, useEffect } from 'react'
import { kadvice } from 'kadvice' 

function TestAdvicePage() {

  const [advice, setAdvice] = useState("")

  useEffect(() => {
    setAdvice(kadvice.getOne())
  }, [])

  const onRefreshHandler = (event) => {
    setAdvice(kadvice.getOne())
  }

  return (
    <div>
      <p>{advice.message}</p>
      <p>{advice.author}</p>
      <button onClick={onRefreshHandler}>새로고침</button>
    </div>
  )
}

export default TestAdvicePage
