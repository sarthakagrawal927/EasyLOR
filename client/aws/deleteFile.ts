import axios from "axios";

const deleteFile = async (url: string, route: string) => {
	const getObjectKey = (url: string) => {
		return url.split("/").slice(3).join("/");
	};
	try {
		const key = getObjectKey(url);
		const response = await axios.post(`${route}/${key}`);
		return response.data as string;
	} catch (error) {
		console.error(error);
	}
};

export default deleteFile;
