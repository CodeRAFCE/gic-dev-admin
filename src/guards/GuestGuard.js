import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';

//Hooks
import useAuth from 'src/hooks/useAuth';

// routes
import {PATH_DASHBOARD} from 'src/routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
	children: PropTypes.node,
};

export default function GuestGuard({children}) {
	const {isAuthenticated} = useAuth();

	if (isAuthenticated) {
		return <Navigate to={PATH_DASHBOARD.root} />;
	}

	return <>{children}</>;
}
