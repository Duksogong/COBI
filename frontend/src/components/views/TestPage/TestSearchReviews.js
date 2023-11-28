import { useSelector } from "react-redux"

function TestSearchReviews() {
  const book = useSelector(state => state.search.reviews.book)
  const reviewList = useSelector(state => state.search.reviews.result)

  return (  
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: '100%', height: '100vh'
      }}>
    
      <div className="item" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <img style={{height: '100px', margin: '10px'}} src={book.image}/>
        <h4>{book.title}</h4>
        <p style={{margin: '0px 10px'}}>작가 | {book.author}</p>
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
