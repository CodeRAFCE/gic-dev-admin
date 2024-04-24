import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
	currentUser: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// export const checkuser = createAsyncThunk('auth/checkuser', async (_, thunkAPI) => {
// 	try {
// 		return await authService.checkuser();
// 	} catch (error) {
// 		const message = (error && error.message) || error.toString();

// 		return thunkAPI.rejectWithValue(message);
// 	}
// });

export const emailLogin = createAsyncThunk("auth/email/login", async (user, thunkAPI) => {
	try {
		return await authService.emailLogin(user);

		// if (data) {
		// 	const {dispatch} = thunkAPI;
		// 	dispatch(checkuser);
		// 	return data;
		// }

		// const message = "Login Failed";

		// return thunkAPI.rejectWithValue(message);
	} catch (error) {
		const message = (error && error.message) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		return await authService.logout();
		// console.log(data);
		// if (data) {
		// 	const {dispatch} = thunkAPI;
		// 	dispatch(checkuser);
		// 	return data;
		// }

		// const message = "Logout Failed";

		// return thunkAPI.rejectWithValue(message);
	} catch (error) {
		const message = (error && error.message) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuth: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			// .addCase(checkuser.pending, (state) => {
			// 	state.isLoading = true;
			// })
			// .addCase(checkuser.fulfilled, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isError = false;
			// 	state.currentUser = action.payload.user;
			// })
			// .addCase(checkuser.rejected, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isSuccess = false;
			// 	state.message = action.payload;
			// 	state.currentUser = null;
			// })
			.addCase(emailLogin.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
			})
			.addCase(emailLogin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.currentUser = action.payload.user;
				state.message = "Authentication Successful";
			})
			.addCase(emailLogin.rejected, (state, action) => {
				state.currentUser = null;
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.currentUser = null;
				state.isLoading = false;
				state.isSuccess = true;
				state.message = "Your Logged Out Successfully";
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
				state.currentUser = null;
			});
	},
});

export const {resetAuth} = authSlice.actions;
export default authSlice.reducer;
