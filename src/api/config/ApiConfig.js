import axios from "axios";

const ASSET_API = axios.create({
    baseURL: 'http://localhost:8082'
});

export default ASSET_API;