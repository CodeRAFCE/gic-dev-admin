import axios from '../../axios-instance';

const emailLogin = async (userData) => {
	const response = await axios.post('/api/auth/login', userData);
	console.log(response.data);
	if (Boolean(response.data.data)) localStorage.setItem('token', response?.data?.data?.token);
	return response.data;
};

const logout = async () => {
	localStorage.removeItem('token');
	return true;
};

const authService = {
	emailLogin,
	logout,
};

export default authService;
