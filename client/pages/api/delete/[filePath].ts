import { NextApiRequest, NextApiResponse } from "next";
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
	const { filePath } = req.query;
	const uploadParams: AWS.S3.DeleteObjectRequest = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: filePath as string,
		BypassGovernanceRetention: true,
	};
	try {
		S3.deleteObject(uploadParams, (error, data) => {
			if (error) throw Error(error.message);
			console.log(data);
			res.status(200).json(data);
		});
	} catch (error) {
		console.error(error);
		res.status(500).json("FILE DELETION FAILED.");
	}
};
