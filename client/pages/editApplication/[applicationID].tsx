import { useRouter } from "next/router";
import withAuth from "components/withAuth";
const Post = () => {
	const router = useRouter();
	const { applicationID } = router.query;

	return <p>Application: {applicationID}</p>;
};

export default withAuth(Post);
