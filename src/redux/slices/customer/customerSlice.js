import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
	customers: [],
	currentCustomer: null,
	isCustomerLoading: false,
	successMessage: "",
	errorMessage: "",
	isError: false,
	isSuccess: false,
};

export const getCustomerById = createAsyncThunk("customers/getById", async (data, thunkAPI) => {
	try {
		return await customerService.getCustomer(data);
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const getCustomers = createAsyncThunk("customers/get/all", async (_, thunkAPI) => {
	try {
		return await customerService.getAllCustomer();
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const addCustomer = createAsyncThunk("customers/add", async (data, thunkAPI) => {
	try {
		return await customerService.createCustomer(data);
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const editCustomer = createAsyncThunk("customers/edit", async (data, thunkAPI) => {
	try {
		const newData = await customerService.updateCustomer(data);

		if (newData) {
			thunkAPI.dispatch(getCustomers());
			return newData;
		} else {
			const message = "Something Went Wrong";

			return thunkAPI.rejectWithValue(message);
		}
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const removeCustomers = createAsyncThunk("customers/remove", async (data, thunkAPI) => {
	try {
		const newData = await customerService.deleteCustomer(data);

		if (newData) {
			thunkAPI.dispatch(getCustomers());
			return newData;
		} else {
			const message = "Something Went Wrong";

			return thunkAPI.rejectWithValue(message);
		}
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

const adminSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		resetAdmin: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(addCustomer.pending, (state) => {
				state.isCustomerLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(addCustomer.fulfilled, (state, action) => {
				state.isCustomerLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.successMessage = "Admin User Successfully Created";
			})
			.addCase(addCustomer.rejected, (state, action) => {
				state.isCustomerLoading = false;
				state.errorMessage = "An Error Occured While Creating an Admin";
				state.isError = true;
				state.isSuccess = false;
			})
			.addCase(editCustomer.pending, (state) => {
				state.isCustomerLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(editCustomer.fulfilled, (state, action) => {
				state.isCustomerLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.successMessage = "Admin User Successfully Updated";
			})
			.addCase(editCustomer.rejected, (state, action) => {
				state.isCustomerLoading = false;
				state.errorMessage = "An Error Occured While Updating an Admin";
				state.isError = true;
				state.isSuccess = false;
			})
			.addCase(getCustomerById.pending, (state) => {
				state.isCustomerLoading = true;
			})
			.addCase(getCustomerById.fulfilled, (state, action) => {
				state.isCustomerLoading = false;
				state.currentCustomer = action.payload.data;
			})
			.addCase(getCustomerById.rejected, (state, action) => {
				state.isCustomerLoading = false;
				state.isError = true;
			})
			.addCase(getCustomers.pending, (state) => {
				state.isCustomerLoading = true;
			})
			.addCase(getCustomers.fulfilled, (state, action) => {
				state.isCustomerLoading = false;
				state.customers = action.payload.data;
			})
			.addCase(getCustomers.rejected, (state, action) => {
				state.isCustomerLoading = false;
				state.isError = true;
			})
			.addCase(removeCustomers.pending, (state) => {
				state.isCustomerLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(removeCustomers.fulfilled, (state, action) => {
				state.isCustomerLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.successMessage = "Admin User Successfully Deleted";
			})
			.addCase(removeCustomers.rejected, (state, action) => {
				state.isCustomerLoading = false;
				state.errorMessage = "An Error Occured While Removing an Admin";
				state.isError = true;
				state.isSuccess = false;
			});
	},
});

export const {resetAdmin} = adminSlice.actions;
export default adminSlice.reducer;
