import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import promocodeService from "./promocodeService";

const initialState = {
	promocodes: [],
	isPromoCodeLoading: false,
	successMessage: "",
	errorMessage: "",
	isError: false,
	isSuccess: false,
};

export const getPromoCodes = createAsyncThunk("promocodes/get/all", async (_, thunkAPI) => {
	try {
		return await promocodeService.getAllCodes();
	} catch (error) {
		const message = (error && error.response.data) || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const addPromoCode = createAsyncThunk("promocodes/add", async (data, thunkAPI) => {
	try {
		const newData = await promocodeService.addCode(data);
		if (newData) {
			thunkAPI.dispatch(getPromoCodes());

			return newData;
		} else {
			const message = "Something went wrong!";

			return thunkAPI.rejectWithValue(message);
		}
	} catch (error) {
		const message = (error && error.response.data) || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const updatePromoCode = createAsyncThunk("promocodes/update", async (data, thunkAPI) => {
	try {
		const newData = await promocodeService.updateCode(data);

		if (newData) {
			thunkAPI.dispatch(getPromoCodes());

			return newData;
		} else {
			const message = "Something went wrong!";

			return thunkAPI.rejectWithValue(message);
		}
	} catch (error) {
		const message = (error && error.response.data) || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const deletePromoCode = createAsyncThunk("promocodes/delete", async (data, thunkAPI) => {
	try {
		return await promocodeService.deleteCode(data);

		// if (newData) {
		// 	thunkAPI.dispatch(getPromoCodes());

		// 	return newData;
		// } else {
		// 	const message = "Something went wrong!";

		// 	return thunkAPI.rejectWithValue(message);
		// }
	} catch (error) {
		const message = (error && error.response.data) || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

const promocodeSlice = createSlice({
	name: "promocode",
	initialState,
	reducers: {
		resetAdmin: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPromoCodes.pending, (state) => {
				state.isPromoCodeLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(getPromoCodes.fulfilled, (state, action) => {
				state.isPromoCodeLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.promocodes = action.payload.data;
			})
			.addCase(getPromoCodes.rejected, (state, action) => {
				state.isPromoCodeLoading = false;
				state.isError = true;
				state.isSuccess = false;
			})
			.addCase(addPromoCode.pending, (state) => {
				state.isPromoCodeLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(addPromoCode.fulfilled, (state, action) => {
				state.isPromoCodeLoading = false;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(addPromoCode.rejected, (state, action) => {
				state.isPromoCodeLoading = false;
				state.isError = true;
				state.isSuccess = false;
			})
			.addCase(updatePromoCode.pending, (state) => {
				state.isPromoCodeLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(updatePromoCode.fulfilled, (state, action) => {
				state.isPromoCodeLoading = false;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(updatePromoCode.rejected, (state, action) => {
				state.isPromoCodeLoading = false;
				state.isError = true;
				state.isSuccess = false;
			})
			.addCase(deletePromoCode.pending, (state) => {
				state.isPromoCodeLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(deletePromoCode.fulfilled, (state, action) => {
				state.isPromoCodeLoading = false;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(deletePromoCode.rejected, (state, action) => {
				state.isPromoCodeLoading = false;
				state.isError = true;
				state.isSuccess = false;
			});
	},
});

export const {resetAdmin} = promocodeSlice.actions;
export default promocodeSlice.reducer;
