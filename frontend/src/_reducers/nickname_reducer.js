import {
    CHANGE_NICKNAME
} from '../_actions/types';

export default function nicknameReducer(state={}, action) {
    switch (action.type) {
        case CHANGE_NICKNAME:
            return { ...state, success: action.payload };

        default:
            return state;
    }
}