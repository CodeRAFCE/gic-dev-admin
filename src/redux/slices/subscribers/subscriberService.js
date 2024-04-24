import axios from "../../../utils/axios";

const getAllSubscribers = async () => {
	const response = await axios.get(`/api/admin/subscribers`);
	return response.data;
};

const subscriberService = {
	getAllSubscribers,
};

export default subscriberService;
