import {
    SELECT_BOOKMARK,
    DESELECT_BOOKMARK
} from '../_actions/types';

export default function categoryReducer(state={}, action) {
    switch (action.type) {
        case SELECT_BOOKMARK:
            return { ...state, success: action.payload };
            break;
        case DESELECT_BOOKMARK:
            return { ...state, success: action.payload }
            break;
        default:
            return state;
    }
}