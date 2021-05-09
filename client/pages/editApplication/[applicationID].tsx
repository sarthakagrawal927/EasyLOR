import { useRouter } from "next/router";

const Post = () => {
	const router = useRouter();
	const { applicationID } = router.query;

	return <p>Application: {applicationID}</p>;
};

export default Post;
