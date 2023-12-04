import {
  SEARCH_BOOK,
  SEARCH_REVIEW
} from '../_actions/types';

export default function searchBookReducer(state={}, action) {
  switch (action.type) {
    case SEARCH_BOOK:
      return { ...state, books: action.payload };

    case SEARCH_REVIEW:
      return { ...state, reviews: action.payload };
    
    default:
      return state;
  }
}