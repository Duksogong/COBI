import axios from "axios";
import { ADD_REVIEW, GET_REVIEW } from "./types";
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
