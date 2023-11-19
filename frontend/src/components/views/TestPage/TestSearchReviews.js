import React from 'react'
import { useLocation } from "react-router-dom"

function TestSearchReviews() {
  const { state } = useLocation()

  return (  
    <div className="item" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <img style={{height: '100px', margin: '10px'}} src={state.image}/>
      <h4>{state.title}</h4>
      <p style={{margin: '0px 10px'}}>작가 | {state.author}</p>
    </div>
  )
}

export default TestSearchReviews
