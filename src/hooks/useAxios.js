import {useState, useEffect} from "react";
// import axios from 'axios';
import axios from "../utils/axios";

// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

/**
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/

export const useAxios = (axiosParams) => {
	const [response, setResponse] = useState(undefined);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchData = async (params) => {
		try {
			if (params.url) {
				const result = await axios(params);
				setResponse(result.data);
				setLoading(false);
			}
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(axiosParams);
	}, []); // execute once only "React 18+ Excutes twice by default with or without strict mode" => Mount, Unmount and Remount Thus Twice

	return {response, error, loading};
};

/**
 USAGE :

 const { response, loading, error } = useAxios({
        method: 'POST',
        url: '/posts',

        // no need to stringify
        headers: {},

        // no need to stringify
        data: {},
    });

 **/
