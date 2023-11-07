import React, { useEffect, useState } from 'react'
import axios from 'axios'

function TestSearchPage() {
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const onSearchTextHandler = (event) => {
    setSearchText(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if(!searchText) {
      alert("검색어를 입력하세요.")
      return
    }

    //axios를 사용하여 네이버 검색 API 요청
    axios.get('/api/search/book', {
      params: {
        query: searchText
      }
    })
    .then(response => {
      setSearchResults(response.data.items)
      alert("검색 완료")
    })
    .catch(err => {
      alert(err)
    })
  }

  //검색 결과가 변경될 때 마다...
  useEffect(() => {
    console.log(searchResults)
  }, [searchResults])

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
        {searchResults.map((result, index) => (
          <div key={index} className="item" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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