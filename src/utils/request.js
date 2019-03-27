import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

// axios.defaults.baseURL = 'http://127.0.0.1:3000';

axios.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    return response;
}, err => {
    return Promise.reject(err);
});

const handleServerData = (data) => {
    if (data.status === 200) {
        return data.result;
    }
    message.error(data.msg);
}

export const post = (url, data) => axios.post(url, qs.stringify(data))
        .then(response => handleServerData(response.data))
        .catch(err => console.log(err));

export const get = (url, data) => axios.get(url, {
            params: data
        })
        .then(response => handleServerData(response.data))
        .catch(err => console.log(err));


