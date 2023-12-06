import {
    LOGIN_USER, 
    REGISTER_USER,
    FIND_USER,
} from '../_actions/types';

export default function userReducer(state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, success: action.payload };
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case FIND_USER:
            return { ...state, success: action.payload };
        default:
            return state;
    }
}