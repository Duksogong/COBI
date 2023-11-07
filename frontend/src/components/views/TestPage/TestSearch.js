import React, { useState } from 'react'
import axios from 'axios'

function TestSearchPage() {
  const [searchText, setSearchText] = useState("")

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
      const title = response.data.items[0].title
      const author = response.data.items[0].author
      const publisher = response.data.items[0].publisher

      alert(`title: ${title}\nauthor: ${author}\npublisher: ${publisher}`)
    })
    .catch(err => {
      alert(err)
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
      }}>
    
      <form style={{display: 'flex', flexDirection: 'row'}}
        onSubmit={onSubmitHandler}  
      >
        <input type="text" value={searchText} onChange={onSearchTextHandler} />
        <button>
          Search
        </button>
      </form>
    </div>
  )
}

export default TestSearchPage