import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import reportService from "./reportService";

const initialState = {
	successData: null,
	errorData: null,
	isUserLoading: false,
	currentUser: null,
};

export const uploadReport = createAsyncThunk("admin/reset", async (data, thunkAPI) => {
	try {
		return await reportService.upload(data);
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		console.log(message);
		return thunkAPI.rejectWithValue(message);
	}
});

const userSlice = createSlice({
	name: "report",
	initialState,
	reducers: {
		resetUser: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(uploadReport.pending, (state) => {
				state.isUserLoading = true;
			})
			.addCase(uploadReport.fulfilled, (state, action) => {
				state.isUserLoading = false;
				state.successData = action.payload;
				state.errorData = null;
			})
			.addCase(uploadReport.rejected, (state, action) => {
				state.isUserLoading = false;
				state.successData = null;
				state.errorData = action.payload;
			});
	},
});

export const {resetUser} = userSlice.actions;
export default userSlice.reducer;
