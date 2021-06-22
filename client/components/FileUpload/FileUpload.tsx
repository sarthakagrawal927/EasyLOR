import { ReactNode, useRef, FC } from "react";
import { InputGroup } from "@chakra-ui/react";
import { UseFormRegisterReturn, Validate } from "react-hook-form";

type FileUploadProps = {
	register: UseFormRegisterReturn;
	accept?: string;
	multiple?: boolean;
	children?: ReactNode;
	fromNewApplication?: boolean;
};
export const validateFiles: Validate<File | FileList> = (value: FileList, maxSize: number = 5) => {
	if (value.length < 1) {
		return "Please upload a file";
	}
	for (const file of Array.from(value)) {
		const fsMb = file.size / (1024 * 1024);
		if (fsMb > maxSize) {
			return "File size should be less than 5MB";
		}
	}
	return true;
};

const FileUpload: FC<FileUploadProps> = ({ register, accept, multiple, children, fromNewApplication }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { name, onChange, ref, ...rest } = register;

	const handleClick = () => {
		console.log("inside file upload");
		inputRef.current?.click();
	};

	return (
		<InputGroup
			onClick={handleClick}
			style={{ display: fromNewApplication === undefined ? "" : "inline-block", width: "inherit" }}
		>
			<input
				name={name}
				type="file"
				multiple={multiple || false}
				hidden
				accept={accept}
				{...rest}
				ref={e => {
					ref(e);
					inputRef.current = e;
				}}
				onChange={onChange}
			/>
			<>{children}</>
		</InputGroup>
	);
};
export default FileUpload;
