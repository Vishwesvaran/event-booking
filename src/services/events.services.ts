import axios from "axios";
import type { Events } from "../types";
import { api_url } from "../utils";


export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${api_url}/events`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeEvent = async (id: string) => {
  try {
    const response = await axios.delete(`${api_url}/events/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const bookSeats = async (id: string) => {
  try {
    const resposne = await axios.put(`${api_url}/events/${id}/book`);
    console.log(resposne.data);
    return resposne.data;
  } catch (error) {
    console.log(error)
  }
};

export const addEvents = async ({
  title,
  date,
  venue,
  availableSeats,
}: Events) => {
  try {
    const response = await axios.post(`${api_url}/events`, {
      title,
      date,
      venue,
      availableSeats,
    });

    console.log(response)
  } catch (error) {
    console.log(error);
  }
};
