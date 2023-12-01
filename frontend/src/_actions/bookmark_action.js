import axios from 'axios';
import {
    MY_BOOKMARK,
} from './types';

export function myBookmark(dataToSubmit) {
    const request = axios.get('/api/users/my_bookmark', dataToSubmit)
        .then(response =>  response.data )
        
    return {
        type: MY_BOOKMARK,
        payload: request,
    }
}
