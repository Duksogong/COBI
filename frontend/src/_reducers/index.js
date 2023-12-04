// 여러 기능에 대한 reducer을 하나로 통합 시켜주는
import { combineReducers } from "redux";
import user from "./user_reducer";
import nickname from "./nickname_reducer";
import password from "./password_reducer";
import category from "./category_reducer";
import bookmark from "./bookmark_reducer";
//import commnet from './commnet_reducer';
import review from "./review_reducer";

import search from "./search_reducer";

const rootReducer = combineReducers({
    user,
    nickname,
    search,
    password,
    category,
    bookmark,
    review,
    //commnet
});

export default rootReducer;
