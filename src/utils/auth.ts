import axios from "axios";
import { api_url } from ".";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};
export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

export const setAuthToken = async (token: string) => {
  localStorage.setItem("token", token);
};
export const isTokenValid = (token: string) => {
  try {
    if (!token) {
      throw new Error("Token is Not there");
    }
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getUserById = async (id: string, token: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${api_url}/auth/verify/${id}`, config);
  return response.data.data;
};
