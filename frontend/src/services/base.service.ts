import axios from "axios";

// const baseURL = "http://localhost:3001/";
const baseURL = "https://incode-backend-68w5dgnd0-noobssos-projects.vercel.app/"

export const base = axios.create({
    baseURL,
    headers:{
        'Content-Type': 'application/json',
    }
});

