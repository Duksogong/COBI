import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
//import { myReview } from '../../../_actions/myReview_action'

function TestMyReviewPage() {
  const dispatch = useDispatch()

  const [option, setOption] = useState("")
  const [reviewList, setReviewList] = useState([])

  //화면 초기화
  useEffect(() => {
    // dispatch(myReview())
    //   .then(response => {
    //     if(response.payload && response.payload.length !== 0) {
    //       setReviewList(response.payload)
    //     }
    //   })
  }, [])

  //option에 따른 정렬
  useEffect(() => {
    if(reviewList !== "") {
      if(option === "date") {
        setReviewList([...reviewList].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
      } else if (option === "dictionary") {
        //-> title: null or undefined error
        //setReviewList([...reviewList].sort((a, b) => a.title.localeCompare(b.title)))
      }
      console.log(reviewList)
    }
  }, [option])

  const onSelectHandler = (event) => {
    event.preventDefault()
    setOption(event.currentTarget.value)
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', width: '100%', height: '100vh'
    }}>
      <div>
        <label for="option">정렬방식: </label>
        <select id="option" onChange={onSelectHandler}>
          <option value="date">최신순</option>
          <option value="dictionary">사전순</option>
        </select>
      </div>
      <div>
      {reviewList.map((result, index) => (
        <div key={index} onClick className="item"
          style={{}}>
          <p>{result.created_at}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TestMyReviewPage