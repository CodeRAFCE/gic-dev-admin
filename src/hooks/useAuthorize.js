import {default as useAuth} from "./useAuth";

const useAuthorize = () => {
	const {isAuthenticated, currentUser} = useAuth();

	const isAuthorized = isAuthenticated && currentUser?.isSuperAdmin;

	return isAuthorized;
};

export default useAuthorize;
