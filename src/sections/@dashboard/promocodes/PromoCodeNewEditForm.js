import PropTypes from "prop-types";
import * as Yup from "yup";
import {useEffect, useMemo} from "react";

// form
import {Controller, useForm} from "react-hook-form";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {yupResolver} from "@hookform/resolvers/yup";

// @mui
import {LoadingButton} from "@mui/lab";
import {Card, Grid, Stack, Box, MenuItem, TextField} from "@mui/material";

// components
import {FormProvider, RHFSelect, RHFSwitch, RHFTextField} from "src/components/hook-form";
import {useDispatch, useSelector} from "src/redux/store";
import {addPromoCode} from "src/redux/slices/promocodes/promocodeSlice";

// ----------------------------------------------------------------------

const TYPE_OPTIONS = ["percentage", "flat"];

PromoCodeNewEditForm.propTypes = {
	isEdit: PropTypes.bool,
	// currentPromocode: PropTypes.object,
};

export default function PromoCodeNewEditForm({isEdit, currentPromocode}) {
	const {isError, isSuccess} = useSelector((state) => state.promocode);
	const dispatch = useDispatch();

	const NewProductSchema = Yup.object().shape({
		code: Yup.string().required("Code name is required"),
		type: Yup.string().required("Offer Type is required"),
		value: Yup.number().nullable().required("Discount value is required"),
		maxUsage: Yup.number().nullable().required("Max Usage is required"),
		maxUsagePerUser: Yup.number().nullable().required("Max Usage per user is required"),
		assignTo: Yup.string().required("Assign To is required"),
		startDate: Yup.string().nullable().required("Start Date is required"),
		endDate: Yup.string().nullable().required("End Date is required"),
	});

	const defaultValues = useMemo(
		() => ({
			code: "",
			type: "percentage",
			value: null,
			maxUsage: null,
			maxUsagePerUser: null,
			assignTo: "",
			startDate: null,
			endDate: null,
			isActive: true,
		}),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const methods = useForm({
		resolver: yupResolver(NewProductSchema),
		defaultValues,
	});

	const {
		reset,
		control,
		handleSubmit,
		formState: {isSubmitting},
	} = methods;

	useEffect(() => {
		if (isEdit && currentPromocode) {
			reset(defaultValues);
		}
		if (!isEdit) {
			reset(defaultValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, currentPromocode]);

	const onSubmit = async (values) => {
		console.log(values);

		const data = {
			code: values.code,
			type: values.type,
			value: values.value,
			maxUsage: values.maxUsage,
			minPlacedOrders: values.minPlacedOrders,
			maxUsagePerUser: values.maxUsagePerUser,
			assignTo: values.assignTo,
			startDate: values.startDate,
			endDate: values.endDate,
			isActive: values.isActive,
		};

		dispatch(addPromoCode(data));

		reset();
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Stack spacing={3}>
						<Card sx={{p: 3}}>
							<Box
								sx={{
									display: "grid",
									columnGap: 2,
									rowGap: 3,
									gridTemplateColumns: {xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)"},
									mb: 2,
								}}
							>
								<RHFTextField name="code" label="Code Name" placeholder="EX - OFFER100" />

								<RHFSelect
									fullWidth
									name="type"
									label="Offer Type"
									InputLabelProps={{shrink: true}}
									SelectProps={{native: false, sx: {textTransform: "capitalize"}}}
								>
									{TYPE_OPTIONS.map((option) => (
										<MenuItem
											key={option}
											value={option}
											sx={{
												mx: 1,
												my: 0.5,
												borderRadius: 0.75,
												typography: "body2",
												textTransform: "capitalize",
											}}
										>
											{option}
										</MenuItem>
									))}
								</RHFSelect>

								<Controller
									name="startDate"
									control={control}
									render={({field, fieldState: {error}}) => (
										<DesktopDatePicker
											label="Start Date"
											value={field.value}
											onChange={(newValue) => {
												field.onChange(newValue);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													fullWidth
													error={!!error}
													helperText={error?.message}
												/>
											)}
										/>
									)}
								/>

								<Controller
									name="endDate"
									control={control}
									render={({field, fieldState: {error}}) => (
										<DesktopDatePicker
											label="End Date"
											value={field.value}
											onChange={(newValue) => {
												field.onChange(newValue);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													fullWidth
													error={!!error}
													helperText={error?.message}
												/>
											)}
										/>
									)}
								/>

								<RHFTextField name="value" label="Discount Value" />
								<RHFTextField name="maxUsage" label="Max Usage" />
								<RHFTextField name="maxUsagePerUser" label="Max Usage Per User" />
								<RHFTextField name="assignTo" label="Assign To" />
							</Box>

							<RHFSwitch name="isActive" label="Activate Promocode" />
						</Card>

						<LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
							{!isEdit ? "Create Promocode" : "Save Changes"}
						</LoadingButton>
					</Stack>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
