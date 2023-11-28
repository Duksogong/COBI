import axios from 'axios';
import {
  SEARCH_BOOK,
  SEARCH_REVIEW
} from './types';

export function searchBook(dataToSubmit) {
  const request = axios.get('/api/search/book/title', { params: dataToSubmit })
    .then(response => response.data)

  return {
    type: SEARCH_BOOK,
    payload: request,
  }
}

export function searchReview(dataToSubmit) {
  console.log(dataToSubmit.isbn)
  const request = axios.get('/api/search/review', { 
    params: {
      query: dataToSubmit.isbn
    }
  })
    .then(response => ({
      success: response.data.success,
      book: dataToSubmit,
      result: response.data.result
    }))

  return {
    type: SEARCH_REVIEW,
    payload: request
  }
}