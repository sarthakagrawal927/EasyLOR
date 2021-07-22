import { FC } from "react";
import { ApplicationContainer } from "../../lib/pastapplications/applications.styled";
import { usePastApplications } from "../../lib/pastapplications/hooks";
import withAuth from "components/withAuth";
import NavBar from "components/NavBar/NavBar";
import PastApplication from "lib/pastapplications/pastapplication/PastApplication";

const PastApplications: FC = () => {
	const { user, data, loading } = usePastApplications();

	return (
		<>
			<NavBar user={user} pastapp />
			<ApplicationContainer>
				{loading && "Loading..."}
				{data?.length === 0 && "No Applications :("}
				{data?.map(student => (
					<PastApplication student={student} facultyUser={user} />
				))}
			</ApplicationContainer>
		</>
	);
};

export default withAuth(PastApplications);
