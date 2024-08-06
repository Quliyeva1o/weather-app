import axios from "axios";
import {BASE_URL} from "./constants";

async function getAll(endpoint: string) {
  try {
    const response = await axios.get(BASE_URL + endpoint);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

const controller = {
  getAll,
};

export default controller;
