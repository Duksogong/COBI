import axios from 'axios';
import {
  SEARCH_BOOK_TITLE,
  SEARCH_BOOK_ISBN,
  SEARCH_REVIEW
} from './types';

export function searchBookTitle(dataToSubmit) {
  const request = axios.get('/api/search/book/title', { params: dataToSubmit })
    .then(response => response.data)

  return {
    type: SEARCH_BOOK_TITLE,
    payload: request,
  }
}

export function searchBookISBN(dataToSubmit) {
  const request = axios.get('/api/search/book/isbn', { params: dataToSubmit })
    .then(response => response.data)

  return {
    type: SEARCH_BOOK_ISBN,
    payload: request,
  }
}

export function searchReview(dataToSubmit) {
  const request = axios.get('/api/search/review', { params: dataToSubmit })
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