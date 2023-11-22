import { combineReducers } from "redux";
import user from './user_reducer';
import nickname from './nickname_reducer';
//import commnet from './commnet_reducer';

const rootReducer = combineReducers({
    user,
    nickname,
    //commnet
})

export default rootReducer;