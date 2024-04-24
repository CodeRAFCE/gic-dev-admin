import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
	orders: null,
	currentOrder: null,
	isOrderError: false,
	isOrderSuccess: false,
	isOrderLoading: false,
	orderMessage: "",
};

export const getAllOrders = createAsyncThunk("order/getAll", async (_, thunkAPI) => {
	try {
		return await orderService.getOrders();
	} catch (error) {
		const message = (error && error.response.error) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const getOrderById = createAsyncThunk("order/get/id", async (data, thunkAPI) => {
	try {
		return await orderService.getOrder(data);
	} catch (error) {
		const message = (error && error.response.error) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const updateStatus = createAsyncThunk("order/update/status", async (postData, thunkAPI) => {
	try {
		const data = await orderService.updateOrderStatus(postData);

		if (data) {
			thunkAPI.dispatch(getAllOrders());

			// TODO #WILL DISPATCH IN ORDERS LIST PAGE (FIX)
			if (postData.id) thunkAPI.dispatch(getOrderById({id: postData.id}));

			return data;
		} else {
			const message = "Something went wrong!";

			return thunkAPI.rejectWithValue(message);
		}
	} catch (error) {
		const message = (error && error.response.error) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const updateKitStatus = createAsyncThunk(
	"order/update/kitstatus",
	async (postData, thunkAPI) => {
		try {
			const data = await orderService.updateKitStatus(postData);

			if (data) {
				thunkAPI.dispatch(getAllOrders());

				// TODO #WILL DISPATCH IN ORDERS LIST PAGE (FIX)
				if (postData?.id) thunkAPI.dispatch(getOrderById({id: postData.id}));

				return data;
			} else {
				const message = "Something went wrong!";

				return thunkAPI.rejectWithValue(message);
			}
		} catch (error) {
			const message = (error && error.response.error) || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		resetOrders: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllOrders.pending, (state) => {
				state.isOrderLoading = true;
			})
			.addCase(getAllOrders.fulfilled, (state, action) => {
				state.isOrderLoading = false;
				state.isOrderSuccess = true;
				state.orders = action.payload;
			})
			.addCase(getAllOrders.rejected, (state, action) => {
				state.isOrderLoading = false;
				state.isOrderError = true;
				state.isOrderSuccess = false;
				state.orderMessage = action.payload;
			})
			.addCase(getOrderById.pending, (state) => {
				state.isOrderLoading = true;
			})
			.addCase(getOrderById.fulfilled, (state, action) => {
				state.isOrderLoading = false;
				state.isOrderSuccess = true;
				state.currentOrder = action.payload;
			})
			.addCase(getOrderById.rejected, (state, action) => {
				state.isOrderLoading = false;
				state.isOrderError = true;
				state.isOrderSuccess = false;
				state.orderMessage = action.payload;
			})
			.addCase(updateStatus.pending, (state) => {
				state.isOrderLoading = true;
			})
			.addCase(updateStatus.fulfilled, (state, action) => {
				state.isOrderLoading = false;
				state.isOrderSuccess = true;
				state.isOrderError = false;
			})
			.addCase(updateStatus.rejected, (state, action) => {
				state.isOrderLoading = false;
				state.isOrderError = true;
				state.isOrderSuccess = false;
			})
			.addCase(updateKitStatus.pending, (state) => {
				state.isOrderLoading = true;
			})
			.addCase(updateKitStatus.fulfilled, (state, action) => {
				state.isOrderLoading = false;
				state.isOrderSuccess = true;
				state.isOrderError = false;
			})
			.addCase(updateKitStatus.rejected, (state, action) => {
				state.isOrderLoading = false;
				state.isOrderError = true;
				state.isOrderSuccess = false;
			});
	},
});

export const {resetOrders} = orderSlice.actions;
export default orderSlice.reducer;
