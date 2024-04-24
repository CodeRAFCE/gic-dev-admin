import React from "react";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	useTheme,
} from "@mui/material";
import {FormProvider, RHFTextField} from "src/components/hook-form";

//components
import {DialogAnimate} from "src/components/animate";

export default function ResetForm({open, handleClose: onClose}) {
	const theme = useTheme();
	// const [showPassword, setShowPassword] = useState(false);

	const ResetSchema = Yup.object().shape({
		password: Yup.string().required("Password is required"),
		confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
	});

	const defaultValues = {
		password: "",
		confirmPassword: "",
	};

	const methods = useForm({
		resolver: yupResolver(ResetSchema),
		defaultValues,
	});

	const {reset, handleSubmit} = methods;

	const onSubmit = async (values) => {
		console.log(values);
		onClose();
		reset();
	};

	return (
		<DialogAnimate open={open} onClose={onClose} keepMounted disableEnforceFocus>
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle>Reset Password</DialogTitle>

				<DialogContent>
					<Box my={2}>
						<Stack spacing={2}>
							<RHFTextField name="password" label="New Password" type="password" />
							<RHFTextField name="confirmPassword" type="password" label="Confirm Password" />
						</Stack>
					</Box>
				</DialogContent>

				<DialogActions>
					<Button
						onClick={onClose}
						sx={{
							color: theme.palette.error.dark,
							"&:hover": {backgroundColor: theme.palette.error.lighter},
						}}>
						Cancel
					</Button>
					<Button type="submit">Reset Password</Button>
				</DialogActions>
			</FormProvider>
		</DialogAnimate>
	);
}
