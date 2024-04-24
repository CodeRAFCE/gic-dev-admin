import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
	successData: null,
	errorData: null,
	isUserLoading: false,
	currentUser: null,
};

// Verify User Email
export const resetPassword = createAsyncThunk('admin/reset', async (data, thunkAPI) => {
	try {
		return await userService.resetpassword(data);
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		console.log(message);
		return thunkAPI.rejectWithValue(message);
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUser: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(resetPassword.pending, (state) => {
				state.isUserLoading = true;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.isUserLoading = false;
				state.successData = action.payload;
				state.errorData = null;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.isUserLoading = false;
				state.successData = null;
				state.errorData = action.payload;
			});
	},
});

export const {resetUser} = userSlice.actions;
export default userSlice.reducer;
