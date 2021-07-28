import { Faculty, FacultyContext } from "context/faculty";
import { useContext, useEffect, useState } from "react";
import { useForm, UseFormRegister, useWatch } from "react-hook-form";
import axios from "axios";
import uploadFile from "aws/uploadFile";
import { createStandaloneToast } from "@chakra-ui/react";

type UseFacultyProfileReturn = {
	faculty: Faculty;
	register: UseFormRegister<Draft>;
	draftUrl: string;
};

type Draft = {
	draft: FileList;
};

export const useFacultyProfile = (): UseFacultyProfileReturn => {
	const { register, control } = useForm<Draft>();
	const draft = useWatch({ control, name: "draft" });
	const { faculty } = useContext(FacultyContext);
	const [draftUrl, setDraftUrl] = useState("");

	const toast = createStandaloneToast();

	useEffect(() => {
		async function uploadDraft() {
			const url = await uploadFile(draft[0], "facultyLORDraft", "/api/upload");
			setDraftUrl(url);
			if (url) {
				toast({
					title: "SUCCESS",
					description: "Draft template uploaded successfully!",
					status: "success",
					duration: 3000,
					position: "top",
					isClosable: true,
				});
			}
		}
		if (draft) uploadDraft();
	}, [draft]);

	return {
		faculty,
		register,
		draftUrl,
	};
};
