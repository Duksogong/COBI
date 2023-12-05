import axios from 'axios';
import {
  SEARCH_BOOK_TITLE,
  SEARCH_BOOK_ISBN,
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