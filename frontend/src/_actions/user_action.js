import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    FIND_USER,
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response =>  response.data )

    // reducer로 보내기
    return {
        type: LOGIN_USER,
        payload: request,
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response =>  response.data )

    return {
        type: REGISTER_USER,
        payload: request,
    }
}

export function findUser(dataToSubmit) {
    const request = axios.get(`/api/users/${dataToSubmit}`)
        .then(response => response.data)

    return {
        type: FIND_USER,
        payload: request,
    }
}




