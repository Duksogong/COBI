import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from "react-router-dom"

function TestSearchReviews() {
  const { state } = useLocation()
  
  const [reviewList, setReviewList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/search/review', {
        params: {
          query: state.isbn
        }
      })
      setReviewList(response.data)
    }

    fetchData()
  }, [state.isbn])

  return (  
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: '100%', height: '100vh'
      }}>
    
      <div className="item" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <img style={{height: '100px', margin: '10px'}} src={state.image}/>
        <h4>{state.title}</h4>
        <p style={{margin: '0px 10px'}}>작가 | {state.author}</p>
      </div>

      <div className="recyclerView">
        {reviewList.map((result, index) => (
          <div key={index} className="item" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <h4>{result.title}</h4>
            <p style={{margin: '0px 10px'}}>{result.review}</p>
          </div>
        ))}
      </div>
    </div>

    
  )
}

export default TestSearchReviews
