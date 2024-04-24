import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import subscriberService from "./subscriberService";

const initialState = {
	subscribers: [],
	isSubscriberLoading: false,
	successMessage: "",
	errorMessage: "",
	isError: false,
	isSuccess: false,
};

export const getSubscribers = createAsyncThunk("subscribers/get/all", async (_, thunkAPI) => {
	try {
		return await subscriberService.getAllSubscribers();
	} catch (error) {
		const message = (error && error.response.data) || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

const enquirySlice = createSlice({
	name: "subscriber",
	initialState,
	reducers: {
		resetAdmin: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSubscribers.pending, (state) => {
				state.isSubscriberLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(getSubscribers.fulfilled, (state, action) => {
				state.isSubscriberLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.subscribers = action.payload.data;
			})
			.addCase(getSubscribers.rejected, (state, action) => {
				state.isSubscriberLoading = false;
				state.isError = true;
				state.isSuccess = false;
			});
	},
});

export const {resetAdmin} = enquirySlice.actions;
export default enquirySlice.reducer;
