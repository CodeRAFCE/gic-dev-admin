import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
	enquiries: [],
	currentEnquiry: null,
	isEnquiryLoading: false,
	successMessage: "",
	errorMessage: "",
	isError: false,
	isSuccess: false,
};

export const getEnquiries = createAsyncThunk("enquiries/get/all", async (_, thunkAPI) => {
	try {
		return await enquiryService.getAllEnquires();
	} catch (error) {
		const message = (error && error.response.data) || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const getEnquiry = createAsyncThunk("enquiries/get/one", async (data, thunkAPI) => {
	try {
		return await enquiryService.getEnquiry(data);
	} catch (error) {
		const message = (error && error.response.data) || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

const enquirySlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		resetAdmin: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getEnquiries.pending, (state) => {
				state.isEnquiryLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(getEnquiries.fulfilled, (state, action) => {
				state.isEnquiryLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.enquiries = action.payload.data;
			})
			.addCase(getEnquiries.rejected, (state, action) => {
				state.isEnquiryLoading = false;
				state.isError = true;
				state.isSuccess = false;
			})
			.addCase(getEnquiry.pending, (state) => {
				state.isEnquiryLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(getEnquiry.fulfilled, (state, action) => {
				state.isEnquiryLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.currentEnquiry = action.payload.data;
			})
			.addCase(getEnquiry.rejected, (state, action) => {
				state.isEnquiryLoading = false;
				state.isError = true;
				state.isSuccess = false;
			});
	},
});

export const {resetAdmin} = enquirySlice.actions;
export default enquirySlice.reducer;
