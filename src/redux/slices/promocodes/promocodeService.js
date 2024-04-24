import axios from "../../../utils/axios";

const getAllCodes = async () => {
	const response = await axios.get(`/api/admin/promocodes`);
	return response.data;
};

const addCode = async (data) => {
	const response = await axios.post(`/api/admin/promocodes`, data);
	return response.data;
};

const updateCode = async (data) => {
	const response = await axios.put(`/api/admin/promocodes/${data.id}`, data.body);
	return response.data;
};

const deleteCode = async (data) => {
	const response = await axios.delete(`/api/admin/promocodes/${data.id}`);
	return response.data;
};

const promocodeService = {
	getAllCodes,
	addCode,
	updateCode,
	deleteCode,
};

export default promocodeService;
