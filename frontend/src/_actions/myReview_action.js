import axios from 'axios';
import {
  MY_REVIEW,
} from './types'

export function myReview() {
  const request = axios.get('/api/users/myReview')
    .then(response => response.data)

  return {
    type: MY_REVIEW,
    payload: request,
  }
}