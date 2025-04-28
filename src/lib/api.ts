import axios from "axios";

export const api = axios.create({
  baseURL: "https://680f6c9c67c5abddd19541d1.mockapi.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});
