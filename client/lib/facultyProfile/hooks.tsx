import { Faculty, FacultyContext } from "context/faculty";
import { useContext, useEffect } from "react";
import { useForm, UseFormRegister, useWatch } from "react-hook-form";
import axios from "axios";

type UseFacultyProfileReturn = {
	faculty: Faculty;
	register: UseFormRegister<Draft>;
};

type Draft = {
	draft: FileList;
};

const fileUpload = (file: File) => {
	const url = "/api/upload";
	const formData = new FormData();
	formData.append("file", file, `facultyLORDraft/${Date.now()}-${file.name}`);
	const config = {
		headers: {
			"content-type": file.type,
		},
	};

	return axios.post(url, formData, config);
};

export const useFacultyProfile = (): UseFacultyProfileReturn => {
	const { register, control } = useForm<Draft>();
	const draft = useWatch({ control, name: "draft" });
	const { faculty } = useContext(FacultyContext);

	useEffect(() => {
		console.log("FILE TO BE UPLOADED: ", draft?.[0]);
		if (draft && draft.length > 0) {
			fileUpload(draft[0]).then(response => {
				console.log("FILE UPLOAD SUCCESSFUL: ", response.data);
			});
		}
	}, [draft]);

	return {
		faculty,
		register,
	};
};
