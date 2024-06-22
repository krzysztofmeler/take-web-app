import axios from 'axios';
import { settings } from '../settings';

const request = axios.create({
    baseURL: settings.backendAPIUrl,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    fetchOptions: {
        mode: 'cors',
    },
});

export { request };
