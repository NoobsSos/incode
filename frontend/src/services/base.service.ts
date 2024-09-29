import axios from "axios";

const baseURL = "http://localhost:5019/";
// const baseURL = "https://incode-backend-2jr72t6ux-noobssos-projects.vercel.app/";

export const base = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});