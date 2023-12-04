import {
  MY_REVIEW
} from '../_actions/types';

export default function myReviewReducer(state={}, action) {
  switch(action.type) {
    case MY_REVIEW:
      return { ...state, success: action.payload };

    default:
      return state;
  }
}