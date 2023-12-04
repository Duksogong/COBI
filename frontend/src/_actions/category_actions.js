import axios from 'axios';
import {
    SELECT_CATEGORY,
    DESELECT_CATEGORY
} from './types';

export function selectCategory(dataToSubmit) {
    const request = axios.post('/api/users/select_category', dataToSubmit)
        .then(response =>  response.data )
        
    return {
        type: SELECT_CATEGORY,
        payload: request,
    }
}

export function deselectCategory(dataToSubmit) {
    const request = axios.post('/api/users/deselect_category', dataToSubmit)
        .then(response =>  response.data )
        
    return {
        type: DESELECT_CATEGORY,
        payload: request,
    }
}