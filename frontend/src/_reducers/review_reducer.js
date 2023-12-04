import { ADD_REVIEW, GET_REVIEW } from "../_actions/types";

export default function reviewReducer(state = {}, action) {
    switch (action.type) {
        case ADD_REVIEW:
            return { ...state, success: action.payload };
        case GET_REVIEW:
            return { ...state, success: action.payload };
        default:
            return state;
    }
}
