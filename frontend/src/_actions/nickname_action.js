import axios from 'axios';
import {
    CHANGE_NICKNAME
} from './types';

export function changeNickname(dataToSubmit) {
    const request = axios.post('/api/users/reset_nickname', dataToSubmit)
        .then(response =>  response.data )

    return {
        type: CHANGE_NICKNAME,
        payload: request,
    }
}