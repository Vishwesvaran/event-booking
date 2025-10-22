import axios from "axios";
import type { Events } from "../types";

const apiUrl = "http://localhost:5500/api";

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${apiUrl}/events`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeEvent = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/events/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const bookSeats = async (id: string) => {
  try {
    const resposne = await axios.put(`${apiUrl}/events/${id}/book`);
    console.log(resposne.data);
    return resposne.data;
  } catch (error) {}
};

export const addEvents = async ({
  title,
  date,
  venue,
  availableSeats,
}: Events) => {
  try {
    const response = await axios.post(`${apiUrl}/events`, {
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
