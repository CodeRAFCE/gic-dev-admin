import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
	admins: [],
	currentAdmin: null,
	isAdminLoading: false,
	successMessage: "",
	errorMessage: "",
	isError: false,
	isSuccess: false,
};

// Verify User Email
export const createAdmin = createAsyncThunk("admin/add", async (data, thunkAPI) => {
	try {
		return await adminService.addAdmin(data);
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const updateAdmin = createAsyncThunk("admin/edit", async (data, thunkAPI) => {
	try {
		return await adminService.editAdmin(data);
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const getAdminById = createAsyncThunk("admin/getById", async (data, thunkAPI) => {
	try {
		return await adminService.getAdmin(data);
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const getAdmins = createAsyncThunk("admin/get/all", async (_, thunkAPI) => {
	try {
		return await adminService.getAllAdmin();
	} catch (error) {
		const message = (error && error.response.data) || error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const removeAdmin = createAsyncThunk("admin/remove", async (data, thunkAPI) => {
	try {
		const newData = await adminService.deleteAdmin(data);

		if (newData) {
			thunkAPI.dispatch(getAdmins());
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
	name: "admin",
	initialState,
	reducers: {
		resetAdmin: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createAdmin.pending, (state) => {
				state.isAdminLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(createAdmin.fulfilled, (state, action) => {
				state.isAdminLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.successMessage = "Admin User Successfully Created";
			})
			.addCase(createAdmin.rejected, (state, action) => {
				state.isAdminLoading = false;
				state.errorMessage = "An Error Occured While Creating an Admin";
				state.isError = true;
				state.isSuccess = false;
			})
			.addCase(updateAdmin.pending, (state) => {
				state.isAdminLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(updateAdmin.fulfilled, (state, action) => {
				state.isAdminLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.successMessage = "Admin User Successfully Updated";
			})
			.addCase(updateAdmin.rejected, (state, action) => {
				state.isAdminLoading = false;
				state.errorMessage = "An Error Occured While Updating an Admin";
				state.isError = true;
				state.isSuccess = false;
			})
			.addCase(getAdminById.pending, (state) => {
				state.isAdminLoading = true;
			})
			.addCase(getAdminById.fulfilled, (state, action) => {
				state.isAdminLoading = false;
				state.currentAdmin = action.payload.data;
			})
			.addCase(getAdminById.rejected, (state, action) => {
				state.isAdminLoading = false;
				state.isError = true;
			})
			.addCase(getAdmins.pending, (state) => {
				state.isAdminLoading = true;
			})
			.addCase(getAdmins.fulfilled, (state, action) => {
				state.isAdminLoading = false;
				state.admins = action.payload.data;
			})
			.addCase(getAdmins.rejected, (state, action) => {
				state.isAdminLoading = false;
				state.isError = true;
			})
			.addCase(removeAdmin.pending, (state) => {
				state.isAdminLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(removeAdmin.fulfilled, (state, action) => {
				state.isAdminLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.successMessage = "Admin User Successfully Deleted";
			})
			.addCase(removeAdmin.rejected, (state, action) => {
				state.isAdminLoading = false;
				state.errorMessage = "An Error Occured While Removing an Admin";
				state.isError = true;
				state.isSuccess = false;
			});
	},
});

export const {resetAdmin} = adminSlice.actions;
export default adminSlice.reducer;
