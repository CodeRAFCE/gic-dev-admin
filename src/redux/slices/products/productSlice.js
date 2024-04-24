import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
	products: null,
	currentProduct: null,
	isProductError: false,
	isProductSuccess: false,
	isProductLoading: false,
	productMessage: '',
};

export const getAllProducts = createAsyncThunk('product/getall', async (_, thunkAPI) => {
	try {
		return await productService.getProducts();
	} catch (error) {
		const message = (error && error.response.error) || error.toString();

		console.log(message);
		return thunkAPI.rejectWithValue(message);
	}
});

export const getProduct = createAsyncThunk('product/getById', async (data, thunkAPI) => {
	try {
		return await productService.getProductById(data);
	} catch (error) {
		const message = (error && error.response.error) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const createProduct = createAsyncThunk('product/create', async (data, thunkAPI) => {
	try {
		return await productService.createProduct(data);
	} catch (error) {
		const message = (error && error.response.error) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		resetProducts: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.isProductLoading = true;
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.isProductLoading = false;
				state.isProductSuccess = true;
				state.products = action.payload;
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.isProductLoading = false;
				state.isProductError = true;
				state.isProductSuccess = false;
				state.productMessage = action.payload;
			})
			.addCase(getProduct.pending, (state) => {
				state.isProductLoading = true;
			})
			.addCase(getProduct.fulfilled, (state, action) => {
				state.isProductLoading = false;
				state.isProductSuccess = true;
				state.currentProduct = action.payload;
			})
			.addCase(getProduct.rejected, (state, action) => {
				state.isProductLoading = false;
				state.isProductError = true;
				state.isProductSuccess = false;
				state.productMessage = action.payload;
			})
			.addCase(createProduct.pending, (state) => {
				state.isProductLoading = true;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.isProductLoading = false;
				state.isProductSuccess = true;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.isProductLoading = false;
				state.isProductError = true;
				state.isProductSuccess = false;
			});
	},
});

export const {resetProducts} = productSlice.actions;
export default productSlice.reducer;
