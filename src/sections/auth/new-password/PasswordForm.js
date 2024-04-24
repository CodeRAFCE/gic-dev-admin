import * as Yup from 'yup';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';

// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// @mui
import {Stack, IconButton, InputAdornment} from '@mui/material';
import {LoadingButton} from '@mui/lab';

// routes
import {PATH_AUTH} from '../../../routes/paths';

// components
import Iconify from '../../../components/Iconify';
import {FormProvider, RHFTextField} from '../../../components/hook-form';

// redux
import {useDispatch} from 'src/redux/store';
import {resetPassword} from 'src/redux/slices/users/userSlice';

// ----------------------------------------------------------------------

export default function PasswordForm() {
	const navigate = useNavigate();
	const {token} = useParams();

	const {enqueueSnackbar} = useSnackbar();
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();

	const VerifySchema = Yup.object().shape({
		password: Yup.string().required('Password is required'),
		confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
	});

	const defaultValues = {
		password: '',
		confirmPassword: '',
	};

	const methods = useForm({
		resolver: yupResolver(VerifySchema),
		defaultValues,
	});

	const {
		handleSubmit,
		formState: {isSubmitting},
	} = methods;

	const onSubmit = async (values) => {
		const data = {
			token,
			password: values.password,
		};

		dispatch(resetPassword(data));

		enqueueSnackbar('Password Update successful!');
		navigate(PATH_AUTH.login, {replace: true});
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack direction='column' spacing={2} justifyContent='center'>
				<RHFTextField name='password' label='Password' type={'password'} />
				<RHFTextField
					name='confirmPassword'
					label='Confirm Password'
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
									<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<LoadingButton
				fullWidth
				size='large'
				type='submit'
				variant='contained'
				loading={isSubmitting}
				// disabled={!isValid}
				sx={{mt: 3}}
			>
				Create Password
			</LoadingButton>
		</FormProvider>
	);
}
