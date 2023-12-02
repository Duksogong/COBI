import {
    CHANGE_PASSWORD
} from '../_actions/types';

export default function passwordReducer(state={}, action) {
    switch (action.type) {
        case CHANGE_PASSWORD:
            return { ...state, success: action.payload };
            break;
        default:
            return state;
    }
}