import axios from 'axios';
import {
    CHANGE_PASSWORD
} from './types';

export function changePassword(dataToSubmit) {
    const request = axios.post('/api/users/reset_password', dataToSubmit)
        .then(response =>  response.data )
        
    return {
        type: CHANGE_PASSWORD,
        payload: request,
    }
}