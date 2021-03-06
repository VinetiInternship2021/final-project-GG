import axios from 'axios';
import { baseUrl, UNVERIFIED_URL } from './configs';

export const userIn = () => new Promise((resolve) => {
  axios.get(`${baseUrl}/user_in`,
    { withCredentials: true })
    .then((resp) => {
      resolve(resp);
    });
});

export const login = (params) => new Promise((resolve, reject) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.post.Accept = '*/*';
  axios.post(`${baseUrl}/login`,
    params,
    { withCredentials: true })
    .then((resp) => {
      resolve(resp);
    })
    .catch((resp) => {
      reject(resp.response.data);
    });
});

export const logout = () => new Promise((resolve) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.post.Accept = '*/*';
  axios.delete(`${baseUrl}/logout`,
    { withCredentials: true })
    .then((resp) => {
      resolve(resp);
    });
});

export const modelShow = (params) => new Promise((resolve) => {
  axios.defaults.headers.get.Accept = '*/*';
  axios.get(`${baseUrl}/${params.model}/${params.userId}`, { withCredentials: true })
    .then((resp) => {
      resolve(resp);
    });
});

export const signUp = (params) => new Promise((resolve, reject) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.post.Accept = '*/*';
  axios.post(`${baseUrl}/${Object.keys(params)[0]}s`,
    params,
    { withCredentials: true })
    .then((resp) => {
      resolve(resp);
    })
    .catch((resp) => {
      reject(resp.response.data);
    });
});

export const getUser = (client) => new Promise((resolve, reject) => {
  axios.defaults.headers.get.Accept = '*/*';
  axios.get(`${baseUrl}/${client}`,
    {
      'Accept-Encoding': 'gzip, deflate, br',
      withCredentials: true,
    })
    .then((resp) => {
      resolve(resp);
    })
    .catch((resp) => {
      reject(resp);
    });
});

export const updateUser = ({ params, userId }) => new Promise((resolve, reject) => {
  axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.put.Accept = '*/*';
  axios.put(`${baseUrl}/${Object.keys(params)[0]}s/${userId}`,
    params,
    { withCredentials: true })
    .then((resp) => {
      resolve(resp);
    })
    .catch((resp) => {
      reject(resp.response.data);
    });
});

export const handleVerify = ({ id }) => new Promise((resolve, reject) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.post.Accept = '*/*';
  axios.post(UNVERIFIED_URL,
    { id },
    { withCredentials: true })
    .then((resp) => {
      resolve(resp);
    })
    .catch((resp) => {
      reject(resp.response.data);
    });
});
