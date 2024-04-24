import axios from "../../../utils/axios";

const getOrders = async () => {
	const response = await axios.get(`/api/admin/orders`);
	return response.data.data;
};

const getOrder = async (data) => {
	const response = await axios.get(`/api/admin/orders/${data.id}`);

	return response.data.order;
};

const updateOrderStatus = async (data) => {
	const response = await axios.put(`/api/admin/orders/updatestatus/${data.id}`, data.data);
	return response.data.data;
};

const updateKitStatus = async (data) => {
	const response = await axios.put(`/api/admin/orders/updatekitstatus/${data.id}`, data);
	return response.data.data;
};

const orderService = {
	getOrders,
	updateOrderStatus,
	getOrder,
	updateKitStatus,
};

export default orderService;
