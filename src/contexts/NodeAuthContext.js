import {createContext, useEffect, useReducer} from "react";
import PropTypes from "prop-types";

// utils
import axios from "../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isAuthenticated: false,
	isInitialized: false,
	isLoading: false,
	currentUser: null,
	errorMessage: "",
	successMessage: "",
};

const setSession = (token) => {
	if (token) {
		localStorage.setItem("token", token);
		axios.defaults.headers.Authorization = `Bearer ${token}`;
		// This function below will handle when token is expired
		// const { exp } = jwtDecode(accessToken);
		// handleTokenExpired(exp);
	} else {
		localStorage.removeItem("token");
		delete axios.defaults.headers.Authorization;
	}
};

const handlers = {
	CHECKUSER: (state, action) => {
		const {isAuthenticated, currentUser} = action.payload;

		return {
			...state,
			isAuthenticated,
			isInitialized: true,
			currentUser,
		};
	},

	LOGIN: (state, action) => {
		return {
			...state,
			isAuthenticated: true,
			currentUser: action.payload.currentUser,
		};
	},

	LOGOUT: (state) => ({
		...state,
		isAuthenticated: false,
		currentUser: null,
	}),
};

const reducer = (state, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
	...initialState,
	method: "node",
	login: () => Promise.resolve(),
	logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
	children: PropTypes.node,
};

function AuthProvider({children}) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const checkUser = async () => {
		try {
			const token = window.localStorage.getItem("token");

			if (token) {
				setSession(token);
				const response = await axios.get("/api/admin/users/myadminaccount");

				const currentUser = response.data.user;

				dispatch({
					type: "CHECKUSER",
					payload: {
						isAuthenticated: true,
						currentUser,
					},
				});
			} else {
				dispatch({
					type: "CHECKUSER",
					payload: {
						isAuthenticated: false,
						currentUser: null,
					},
				});
			}
		} catch (err) {
			console.log(err);

			dispatch({
				type: "CHECKUSER",
				payload: {
					isAuthenticated: false,
					currentUser: null,
				},
			});
		}
	};

	useEffect(() => {
		checkUser();
	}, [dispatch]);

	const login = async (email, password) => {
		const userData = {
			email,
			password,
		};

		const response = await axios.post("/api/admin/users/signin", userData);

		if (Boolean(response.data.data)) {
			const {token, user} = response.data.data;

			setSession(token);

			dispatch({
				type: "LOGIN",
				payload: {
					isAuthenticated: true,
					currentUser: user,
				},
			});
		}
	};

	const logout = async () => {
		setSession(null);

		dispatch({type: "LOGOUT"});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				method: "node",
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export {AuthContext, AuthProvider};
