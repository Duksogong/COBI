import axios from "axios";
import { ADD_REVIEW, GET_REVIEW, GET_FEED, GET_REC } from "./types";

export function addReview(dataToSubmit) {
    const request = axios
        .post("/api/review", dataToSubmit)
        .then((response) => response.data);

    return {
        type: ADD_REVIEW,
        payload: request,
    };
}

export function getReview() {
    const request = axios.get("/api/review").then((response) => response.data);

    return {
        type: GET_REVIEW,
        payload: request,
    };
}

export function getFeed() {
    const request = axios.get('/api/review/feed')
        .then(response => response.data)

    return {
        type: GET_FEED,
        payload: request,
    }
}

export function getRec() {
    const request = axios.get('/api/review/rec')
        .then(response => response.data)

    return {
        type: GET_REC,
        payload: request,
    }
}
