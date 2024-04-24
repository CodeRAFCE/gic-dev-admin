import axios from "../../../utils/axios";

const createProduct = async (data) => {
	const response = await axios.get(`/api/admin/products`, data);
	return response.data.products;
};

const getProducts = async () => {
	const response = await axios.get(`/api/admin/products`);
	return response.data.products;
};

const getProductById = async (data) => {
	const response = await axios.get(`/api/admin/products/${data.id}`);
	return response.data.products;
};

const productService = {
	getProducts,
	getProductById,
	createProduct,
};

export default productService;
