import PropTypes from 'prop-types';
import {Container, Alert, AlertTitle} from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import {useLocation} from 'react-router-dom';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
	accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
	children: PropTypes.node,
};

const useCurrentRole = () => {
	// Logic here to get current user role
	const role = 'admin';
	return role;
};

export default function RoleBasedGuard({children}) {
	const currentRole = useCurrentRole();
	const {pathname} = useLocation();
	const {currentUser} = useAuth();

	if (!pathname.includes(currentRole) && currentUser?.isSuperAdmin) {
		return (
			<Container>
				<Alert severity='error'>
					<AlertTitle>Permission Denied</AlertTitle>
					You do not have permission to access this page
				</Alert>
			</Container>
		);
	}

	return <>{children}</>;
}
