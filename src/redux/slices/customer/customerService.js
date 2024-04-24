import axios from "../../../utils/axios";

const createCustomer = async (data) => {
	const response = await axios.post(`/api/admin/customers/`, data);
	return response.data;
};

const updateCustomer = async (data) => {
	const response = await axios.put(`/api/admin/customers/${data._id}`, data);
	return response.data;
};

const getAllCustomer = async () => {
	const response = await axios.get(`/api/admin/customers`);
	return response.data;
};

const getCustomer = async (data) => {
	const response = await axios.get(`/api/admin/customers/${data.id}`);
	return response.data;
};

const deleteCustomer = async (data) => {
	const response = await axios.delete(`/api/admin/customers/${data.id}`);
	return response.data;
};

const customerService = {
	createCustomer,
	updateCustomer,
	getAllCustomer,
	getCustomer,
	deleteCustomer,
};

export default customerService;
