import { useState, useCallback } from "react";
import axios from "axios";
// import { API_URL } from "../config";

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;

    const apiCall = useCallback(async (method, endpoint, data = null, options = {}) => {
        setLoading(true);
        setError(null);

        try {
            const config = {
                method,
                url: `${API_URL}${endpoint}`,
                ...options,
                withCredentials: true,
            };

            if (data && (method.toLowerCase() === "post" || method.toLowerCase() === "put")) {
                config.data = data;
            }

            const response = await axios(config);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || "An error occurred";
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    }, []);

    const get = useCallback(
        (endpoint, options = {}) => {
            return apiCall("get", endpoint, null, options);
        },
        [apiCall]
    );

    const post = useCallback(
        (endpoint, data, options = {}) => {
            return apiCall("post", endpoint, data, options);
        },
        [apiCall]
    );

    const put = useCallback(
        (endpoint, data, options = {}) => {
            return apiCall("put", endpoint, data, options);
        },
        [apiCall]
    );

    const del = useCallback(
        (endpoint, options = {}) => {
            return apiCall("delete", endpoint, null, options);
        },
        [apiCall]
    );

    return {
        loading,
        error,
        get,
        post,
        put,
        delete: del,
    };
};

export default useApi;
