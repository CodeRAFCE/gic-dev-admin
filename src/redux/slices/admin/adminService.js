import axios from '../../../utils/axios';

const addAdmin = async (data) => {
	const response = await axios.post(`/api/admin/users`, data);
	return response.data;
};

const getAllAdmin = async () => {
	const response = await axios.get(`/api/admin/users`);
	return response.data;
};

const getAdmin = async (data) => {
	const response = await axios.get(`/api/admin/users/${data.id}`);
	return response.data;
};

const editAdmin = async (data) => {
	const response = await axios.put(`/api/admin/users/${data._id}`, data);
	return response.data;
};

const deleteAdmin = async (data) => {
	const response = await axios.delete(`/api/admin/users/${data.id}`);
	return response.data;
};

const userService = {
	addAdmin,
	getAllAdmin,
	getAdmin,
	editAdmin,
	deleteAdmin,
};

export default userService;
