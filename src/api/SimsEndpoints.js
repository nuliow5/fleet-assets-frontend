import API from "./ApiConfig";

export const getAllSims = () => API.get('/assets/sims');

export const deleteSimById = () => API.delete('/assets/sims/:id');