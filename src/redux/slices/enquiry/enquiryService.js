import axios from "../../../utils/axios";

const getAllEnquires = async () => {
	const response = await axios.get(`/api/admin/enquiries`);
	return response.data;
};

const getEnquiry = async (data) => {
	const response = await axios.get(`/api/admin/enquiries/${data.id}`);
	return response.data;
};

const enquiryService = {
	getAllEnquires,
	getEnquiry,
};

export default enquiryService;
