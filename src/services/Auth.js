import axios from 'axios';
import { API_URL } from '../config/config';

const API_ENDPOINT = API_URL + '/api';

export function registerApi(data) {
    return axios.post(`${API_ENDPOINT}/register`, data);
}

export function loginApi(data) {
    return axios.post(`${API_ENDPOINT}/login`, data);
}