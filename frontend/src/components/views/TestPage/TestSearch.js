import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchBook, searchReview } from "../../../_actions/search_action"

function TestSearchPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState(["none"])

  const onSearchTextHandler = (event) => {
    setSearchText(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if(!searchText) {
      alert("검색어를 입력하세요.")
      return
    }

    let body = {
      query: searchText,
    }

    dispatch(searchBook(body))
      .then(response => {
        if(response.payload.success) {
          setSearchResults(response.payload.result.items)
        } 
      })
  }

  const onClickHandler = (event, index) => {
    event.preventDefault()

    let book = searchResults[index]

    dispatch(searchReview(book))
      .then(response => {
        if(response.payload.success) {
          navigate('/test/searchReviews')
        }
      })
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: '100%', height: '100vh'
      }}>
    
      <form style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '10px'}} onSubmit={onSubmitHandler}>
        <input type="text" value={searchText} onChange={onSearchTextHandler} />
        <button>
          Search
        </button>
      </form>

      <div className="recyclerView">
        {searchResults[0] !== "none" && searchResults.length === 0 && (
          <div style={{textAlign: 'center'}}>
            <p>검색된 작품이 없습니다.</p>
          </div>
        )}

        {searchResults[0] !== "none" && searchResults.length > 0 && searchResults.map((result, index) => (
          <div key={index} onClick={(event) => onClickHandler(event, index)} className="item" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <img style={{height: '100px', margin: '10px'}} src={result.image}/>
            <h4>{result.title}</h4>
            <p style={{margin: '0px 10px'}}>작가 | {result.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestSearchPage