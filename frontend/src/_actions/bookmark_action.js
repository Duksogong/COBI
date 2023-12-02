import axios from 'axios';
import {
    SELECT_BOOKMARK,
    DESELECT_BOOKMARK
} from './types';

export function selectBookmark(dataToSubmit) {
    const request = axios.post('/api/users/select_bookmark', dataToSubmit)
        .then(response =>  response.data )
        
    return {
        type: SELECT_BOOKMARK,
        payload: request,
    }
}

export function deselectBookmark(dataToSubmit) {
    const request = axios.post('/api/users/deselect_bookmark', dataToSubmit)
        .then(response =>  response.data )
        
    return {
        type: DESELECT_BOOKMARK,
        payload: request,
    }
}