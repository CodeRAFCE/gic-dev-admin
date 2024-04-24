import axios from "../../../utils/axios";

const upload = async (data) => {
	const response = await axios.post(`/api/admin/reports`, data);
	return response.data.products;
};

const reportService = {
	upload,
};

export default reportService;
