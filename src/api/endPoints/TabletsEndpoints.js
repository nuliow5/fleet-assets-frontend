import API from "../config/ApiConfig";

export const getAllTablets = () => API.get('/assets/tablets');
export const getTabletsWithMicroUsb = () => API.get('/assets/tablets?chargerType=MICRO_USB')
export const getTabletsWithCType = () => API.get('/assets/tablets?chargerType=C_TYPE')