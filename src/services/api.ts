import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080", // change this if your backend URL is different
  headers: {
    "Content-Type": "application/json",
  },
});