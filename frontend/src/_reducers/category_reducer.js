import {
    SELECT_CATEGORY,
    DESELECT_CATEGORY,
} from '../_actions/types';

export default function categoryReducer(state={}, action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return { ...state, success: action.payload };
            break;
        case DESELECT_CATEGORY:
            return { ...state, success: action.payload }
            break;
        default:
            return state;
    }
}