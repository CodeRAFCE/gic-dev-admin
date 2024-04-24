import axios from 'axios';
// config
import {HOST_API} from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
	baseURL: HOST_API,
	header: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
	// (config) => {
	// 	const token = localStorage.getItem('token');

	// 	config.headers.Authorization = token ? `Bearer ${token}` : '';
	// 	return config;
	// }
);

export default axiosInstance;
