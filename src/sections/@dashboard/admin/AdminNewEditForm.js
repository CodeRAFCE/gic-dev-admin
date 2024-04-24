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
import {Box, Card, Grid, Stack, Typography} from "@mui/material";
// utils
import {fData} from "../../../utils/formatNumber";
// routes
import {PATH_DASHBOARD} from "../../../routes/paths";
// components
import {
	FormProvider,
	RHFSwitch,
	RHFTextField,
	RHFUploadAvatar,
} from "../../../components/hook-form";

// redux
import {useDispatch, useSelector} from "src/redux/store";
import {createAdmin, updateAdmin} from "src/redux/slices/admin/adminSlice";
import {IMAGE_ONLY} from "src/utils/fileFormats";

// ----------------------------------------------------------------------

AdminNewEditForm.propTypes = {
	isEdit: PropTypes.bool,
	currentAdmin: PropTypes.object,
};

export default function AdminNewEditForm({isEdit, currentAdmin}) {
	const navigate = useNavigate();
	const {adminId} = useParams();
	const {enqueueSnackbar} = useSnackbar();

	const {isError, isSuccess} = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	const NewAdminSchema = Yup.object().shape({
		firstName: Yup.string().required("First Name is required"),
		lastName: Yup.string().required("Last Name is required"),
		email: Yup.string().required("Email is required").email(),
		phoneNumber: Yup.string().required("Phone number is required"),
		// avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
	});

	const defaultValues = useMemo(
		() => ({
			firstName: currentAdmin?.firstName || "",
			lastName: currentAdmin?.lastName || "",
			email: currentAdmin?.email || "",
			phoneNumber: currentAdmin?.phone || "",
			isSuperadmin: currentAdmin?.isSuperadmin || false,
			avatarUrl: currentAdmin?.avatar || null,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentAdmin]
	);

	const methods = useForm({
		resolver: yupResolver(NewAdminSchema),
		defaultValues,
	});

	const {
		reset,
		setValue,
		handleSubmit,
		formState: {isSubmitting},
	} = methods;

	useEffect(() => {
		if (isEdit && currentAdmin) {
			reset(defaultValues);
		}
		if (!isEdit) {
			reset(defaultValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, currentAdmin]);

	const onSubmit = (values) => {
		if (!isEdit) {
			const data = {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				phone: values.phoneNumber,
				avatar: values.avatarUrl,
				isSuperAdmin: values.isSuperadmin,
			};
			dispatch(createAdmin(data));
		} else {
			const data = {
				_id: adminId,
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				phone: values.phoneNumber,
				avatar: values.avatarUrl,
			};
			dispatch(updateAdmin(data));
		}

		reset();

		if (isError) {
			enqueueSnackbar("Could not Add admin", {variant: "error"});
		} else if (isSuccess) {
			enqueueSnackbar("Admin User Successfully Created");
		} else if (isEdit) {
			enqueueSnackbar("Admin User Successfully Updated");
		}

		navigate(PATH_DASHBOARD.admin.list);
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
							<RHFTextField name="firstName" label="First Name" />
							<RHFTextField name="lastName" label="Last Name" />
							<RHFTextField name="email" label="Email Address" />
							<RHFTextField name="phoneNumber" label="Phone Number" />
							<RHFSwitch
								name="isSuperadmin"
								labelPlacement="start"
								label={
									<>
										<Typography variant="subtitle2" sx={{mb: 0.5}}>
											Super Admin
										</Typography>
										<Typography variant="body2" sx={{color: "text.secondary"}}>
											Enabling this will make the admin a super admin
										</Typography>
									</>
								}
								sx={{mx: 0, width: 1, justifyContent: "space-between"}}
							/>
						</Box>

						<Stack alignItems="flex-end" sx={{mt: 3}}>
							<LoadingButton type="submit" variant="contained" loading={isSubmitting}>
								{!isEdit ? "Create Admin" : "Save Changes"}
							</LoadingButton>
						</Stack>
					</Card>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
