import axios from "axios";

const uploadFile = async (file: File, directory: string) => {
	const formData = new FormData();
	formData.append("file", file, `${directory}/${Date.now()}-${file.name}`);
	const config = {
		headers: {
			"content-type": file.type,
		},
	};

	try {
		const response = await axios.post("/api/upload", formData, config);
		return response.data as string;
	} catch (error) {
		console.error(error);
	}
};

export default uploadFile;
