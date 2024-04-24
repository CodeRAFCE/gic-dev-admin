import PropTypes from "prop-types";

// components
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "src/hooks/useAuth";

// ----------------------------------------------------------------------

SuperAdminGuard.propTypes = {
	children: PropTypes.node,
};

export default function SuperAdminGuard({children}) {
	const {isAuthenticated, isInitialized, currentUser} = useAuth();

	const isAuthorized = isAuthenticated && currentUser?.isSuperAdmin;

	if (!isInitialized) {
		return <LoadingScreen />;
	}

	return <>{true && children}</>;
}
