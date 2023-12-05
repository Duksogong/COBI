import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { searchBook, searchReview } from '../../../_actions/search_action';

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';

function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState(["none"])

  // useParams 훅을 사용하여 searchText 추출
  const { searchText } = useParams();

  useEffect(() => {
    let body = {
      query: searchText,
    }

    //책 목록 가져오기
    dispatch(searchBook(body))
      .then(response => {
        if(response.payload.success) {
          setSearchResults(response.payload.result.items)
        }
    })
  }, [searchText])

  const onClickHandler = (idx) => {
    const book = searchResults[idx]
    navigate(`search/${book.isbn}`)
  }

  return (
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <NavBar />
      <div className="d-flex flex-column align-items-center flex-grow-1">
        <div style={{ width:'100%', padding:'20px' ,fontSize: '20px', fontWeight:'bold' }}>검색어 - {searchText}(10)</div>
        <div style={{ margin:'15px', marginTop:'0px', height: '35.5em', overflow:'auto', scrollbarWidth: 'thin', msOverflowStyle: 'none' }}>
          <style>{`::-webkit-scrollbar { display: none;}`}</style>
          {searchResults.map((result, idx) => (
            <Card key={idx} onClick={() => onClickHandler(idx)} style={{ margin:'10px'}}>
              <Container>
                <Row>
                  <Col xs={2} className="d-flex align-items-center justify-content-center">
                    <img style={{ width:'60px', height:'80px', objectFit:'cover' }}
                      src={result.image}
                      alt="표지준비중"/>
                  </Col>
                  <Col xs={10} className="d-flex flex-column align-items-center justify-content-center">
                    <p style={{ margin:'5px', fontSize:'15px', fontWeight:'bold', display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2 }}>{result.title}</p>
                    <p style={{ margin:'5px', fontSize:'12px', color:'#808080', maxWidth:'260px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis' }}>{result.publisher} | {result.author} | {result.pubdate}</p>
                  </Col>
                </Row>
              </Container>
            </Card>
          ))}
        </div>
        <div style={{ margin:'10px' }}>
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchPage