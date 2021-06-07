export function uploadPhoto(file: File) {
	console.log("Uploading...", file.name);
	return `https://localhost/${file.name}${Date.now().toString()}`;
}
