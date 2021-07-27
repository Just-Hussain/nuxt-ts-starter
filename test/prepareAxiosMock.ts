import { AxiosRequestConfig } from 'axios';

/**
 * Includes the $ helpers from nuxt/axios into the vanilla axios.
 * @param axios axios instance
 */
const prepareAxiosMock = (axios: any) => {
	axios.$get = async (url: string, config?: AxiosRequestConfig) => {
		const repsonse = await axios.get(url, config);
		return repsonse.data;
	};

	axios.$post = async (url: string, config?: AxiosRequestConfig) => {
		const repsonse = await axios.post(url, config);
		return repsonse.data;
	};

	axios.$delete = async (url: string, config?: AxiosRequestConfig) => {
		const repsonse = await axios.delete(url, config);
		return repsonse.data;
	};

	axios.$head = async (url: string, config?: AxiosRequestConfig) => {
		const repsonse = await axios.head(url, config);
		return repsonse.data;
	};

	axios.$options = async (url: string, config?: AxiosRequestConfig) => {
		const repsonse = await axios.options(url, config);
		return repsonse.data;
	};

	axios.$patch = async (url: string, config?: AxiosRequestConfig) => {
		const repsonse = await axios.patch(url, config);
		return repsonse.data;
	};

	axios.$put = async (url: string, config?: AxiosRequestConfig) => {
		const repsonse = await axios.put(url, config);
		return repsonse.data;
	};

	axios.$request = async (url: string, config?: AxiosRequestConfig) => {
		const repsonse = await axios.request(url, config);
		return repsonse.data;
	};
};

export default prepareAxiosMock;
