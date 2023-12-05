import {
  SEARCH_BOOK_TITLE,
  SEARCH_BOOK_ISBN,
  SEARCH_REVIEW
} from '../_actions/types';

export default function searchBookReducer(state={}, action) {
  switch (action.type) {
    case SEARCH_BOOK_TITLE:
      return { ...state, books: action.payload };

    case SEARCH_BOOK_ISBN:
      return { ...state, books: action.payload };

    case SEARCH_REVIEW:
      return { ...state, reviews: action.payload };
    
    default:
      return state;
  }
}