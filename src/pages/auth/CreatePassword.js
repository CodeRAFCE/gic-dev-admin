
// @mui
import {styled} from '@mui/material/styles';
import {Box, Link, Container, Typography} from '@mui/material';
// layouts
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';
// components
import Page from 'src/components/Page';
import {PasswordForm} from 'src/sections/auth/new-password';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
	display: 'flex',
	height: '100%',
	alignItems: 'center',
	padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function CreatePassword() {
	return (
		<Page title='Verify' sx={{height: 1}}>
			<RootStyle>
				<LogoOnlyLayout />

				<Container maxWidth={'sm'}>
					<Typography variant='h3' paragraph>
						Create Your New Password
					</Typography>
					<Typography sx={{color: 'text.secondary'}}>
						You can start using your new login credentials after you create a new password
					</Typography>

					<Box sx={{mt: 5, mb: 3}}>
						<PasswordForm />
					</Box>

					<Typography variant='body2' align='center'>
						Didn't Receive your mail? &nbsp;
						<Link variant='subtitle2' underline='none' sx={{cursor: 'pointer'}} onClick={() => {}}>
							Resend Mail
						</Link>
					</Typography>
				</Container>
			</RootStyle>
		</Page>
	);
}
