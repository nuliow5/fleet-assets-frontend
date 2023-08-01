import API from "../config/ApiConfig";

export const getAllTrucks = () => API.get('/trucks')
export const getEuTrucks = () => API.get('/trucks?workRegion=EUROPE')
export const getBalticTrucks = () => API.get('/trucks?workRegion=BALTIC')