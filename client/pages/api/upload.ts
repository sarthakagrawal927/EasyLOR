import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import AWS from "aws-sdk";

export const config = {
	api: {
		bodyParser: false,
	},
};

const S3 = new AWS.S3({
	credentials: {
		accessKeyId: process.env.CLIENT_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.CLIENT_AWS_SECRET_ACCESS_KEY,
	},
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const data: any = await new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm({
			keepExtensions: true,
		});

		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			resolve({ fields, files });
		});
	});

	const fileContent = fs.readFileSync(data?.files?.file?.path);
	const uploadParams: AWS.S3.PutObjectRequest = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: `${data?.files?.file?.name}`,
		Body: fileContent,
		ACL: "public-read",
	};
	try {
		S3.upload(uploadParams, (error, responseData) => {
			if (error) throw Error(error.message);
			res.status(200).json(responseData.Location);
		});
	} catch (error) {
		console.error("Error: ", error);
		res.status(500).json("FILE UPLOAD FAILED.");
	}
};
