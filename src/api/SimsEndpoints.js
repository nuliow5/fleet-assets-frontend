import API from "./ApiConfig";

export const getAllSims = () => API.get('/assets/sims');

export const getTeliaSims =() => API.get('/assets/sims?operator=TELIA')
export const getBiteSims =() => API.get('/assets/sims?operator=BITE')
export const getTele2Sims =() => API.get('/assets/sims?operator=TELE2')

