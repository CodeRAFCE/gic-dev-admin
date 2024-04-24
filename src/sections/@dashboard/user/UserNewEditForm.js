import PropTypes from "prop-types";
import * as Yup from "yup";
import {useCallback, useEffect, useMemo} from "react";
import {useSnackbar} from "notistack";
import {useNavigate, useParams} from "react-router-dom";
// form
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
// @mui
import {LoadingButton} from "@mui/lab";
import {Box, Button, Card, Grid, MenuItem, Stack, Typography} from "@mui/material";
// utils
import {fData} from "../../../utils/formatNumber";
import {IMAGE_ONLY} from "src/utils/fileFormats";

// redux
import {addCustomer, editCustomer} from "src/redux/slices/customer/customerSlice";
import {useDispatch, useSelector} from "src/redux/store";
//hooks
import useToggle from "src/hooks/useToggle";

// routes
import {PATH_DASHBOARD} from "../../../routes/paths";
// components
import {
	FormProvider,
	RHFSelect,
	RHFTextField,
	RHFUploadAvatar,
} from "../../../components/hook-form";
import {ResetForm} from "./reset";
import useAuthorize from "src/hooks/useAuthorize";

// ----------------------------------------------------------------------

const PROMOCODES = ["OFFER100", "FREEBIE", "OFFERB1G1"];

UserNewEditForm.propTypes = {
	isEdit: PropTypes.bool,
	currentUser: PropTypes.object,
};

export default function UserNewEditForm({isEdit, currentCustomer}) {
	const navigate = useNavigate();
	const {userId} = useParams();
	const {enqueueSnackbar} = useSnackbar();
	const isAuthorize = useAuthorize();

	console.log("SUPER ADMIN", isEdit && !isAuthorize);
	console.log("SUPER_ADMIN", isAuthorize);

	const {toggle: open, onOpen: handleOpen, onClose: handleClose} = useToggle();

	const {isError, isSuccess} = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	const NewUserSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		email: Yup.string().required("Email is required").email(),
		phoneNumber: Yup.number("Phone Number is required").required("Phone number is required"),
		password: Yup.string().required("Password required is required"),
		confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
		// avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
	});

	const defaultValues = useMemo(
		() => ({
			name: currentCustomer?.userName ?? "",
			email: currentCustomer?.email ?? "",
			phoneNumber: currentCustomer?.phone ?? "",
			assignCode: "",
			avatarUrl: null,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentCustomer]
	);

	const methods = useForm({
		resolver: yupResolver(NewUserSchema),
		defaultValues,
	});

	const {
		reset,
		setValue,
		handleSubmit,
		formState: {isSubmitting},
	} = methods;

	useEffect(() => {
		console.log("mounted");
		if (isEdit && currentCustomer) {
			console.log("edit values");
			reset(defaultValues);
		} else {
			console.log("new form cleared");
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, currentCustomer]);

	const onSubmit = async (values) => {
		if (!isEdit) {
			const data = {
				userName: values.name,
				email: values.email,
				phone: values.phoneNumber,
				password: values.password,
				avatar: values.avatarUrl,
			};
			dispatch(addCustomer(data));
		} else {
			const data = {
				_id: userId,
				userName: values.name,
				email: values.email,
				phone: values.phoneNumber,
				avatar: values.avatarUrl,
			};
			dispatch(editCustomer(data));
		}

		reset();

		if (isError) {
			enqueueSnackbar("Could not Add Customer", {variant: "error"});
		} else if (isSuccess) {
			enqueueSnackbar("Customer Successfully Created");
		} else if (isEdit) {
			enqueueSnackbar("Customer Successfully Updated");
		}

		navigate(PATH_DASHBOARD.customer.list);
	};

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file) {
				setValue(
					"avatarUrl",
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				);
			}
		},
		[setValue]
	);

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Card sx={{py: 8, px: 3}}>
						<Box sx={{mb: 5}}>
							<RHFUploadAvatar
								name="avatarUrl"
								accept={IMAGE_ONLY}
								maxSize={3145728}
								onDrop={handleDrop}
								helperText={
									<Typography
										variant="caption"
										sx={{
											mt: 2,
											mx: "auto",
											display: "block",
											textAlign: "center",
											color: "text.secondary",
										}}
									>
										Allowed *.jpeg, *.jpg, *.webp
										<br /> max size of {fData(3145728)}
									</Typography>
								}
							/>
						</Box>
					</Card>
				</Grid>

				<Grid item xs={12} md={8}>
					<Card sx={{p: 3}}>
						<Box
							sx={{
								display: "grid",
								columnGap: 2,
								rowGap: 3,
								gridTemplateColumns: {xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)"},
							}}
						>
							<RHFTextField name="name" label="Full Name" />
							<RHFTextField name="email" disabled={!isAuthorize && isEdit} label="Email Address" />
							<RHFTextField
								name="phoneNumber"
								disabled={!isAuthorize && isEdit}
								label="Phone Number"
							/>

							<RHFSelect
								fullWidth
								name="assignCode"
								label="Assign Code"
								InputLabelProps={{shrink: true}}
								placeholder={"Select Code"}
								SelectProps={{native: false, sx: {textTransform: "capitalize"}}}
							>
								{PROMOCODES.map((option) => (
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

							{!isEdit && (
								<>
									<RHFTextField name="password" label="Password" type="password" />
									<RHFTextField name="confirmPassword" label="Confirm Password" type="password" />
								</>
							)}

							<ResetForm open={open} handleClose={handleClose} />
						</Box>

						<Stack direction="row" spacing={2} justifyContent={"flex-end"} sx={{mt: 3}}>
							{isEdit && (
								<Button variant="outlined" onClick={handleOpen}>
									Reset Password
								</Button>
							)}
							<LoadingButton type="submit" variant="contained" loading={isSubmitting}>
								{!isEdit ? "Create User" : "Save Changes"}
							</LoadingButton>
						</Stack>
					</Card>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
