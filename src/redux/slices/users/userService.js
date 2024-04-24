import axios from '../../../utils/axios';

const resetpassword = async (data) => {
	const response = await axios.post(`/api/admin/users/resetpassword/${data.token}`, data);
	return response.data;
};

const userService = {
	resetpassword,
};

export default userService;
