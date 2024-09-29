import axios from "axios";

// const baseURL = "http://localhost:5019/";
const baseURL = "https://incode-backend-5rm8qv1zc-noobssos-projects.vercel.app/";

export const base = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});