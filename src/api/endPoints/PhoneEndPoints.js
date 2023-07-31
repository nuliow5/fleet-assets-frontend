import API from "../config/ApiConfig";

export const getAllPhones = () => API.get('/assets/phones');
export const getPhoneWithMicroUsb = () => API.get('/assets/phones?chargerType=MICRO_USB');
export const getPhoneWithCType = () => API.get('/assets/phones?chargerType=C_TYPE');