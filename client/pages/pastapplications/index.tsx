import { FC } from "react";
import { Heading, Image, Box } from "@chakra-ui/react";
import {
	ApplicationContainer,
	PastApplicationsContainer,
	ImageNameContainer,
	ProfileContainer,
	AcceptedUniversity,
	TestScoreContainer,
} from "../../lib/pastapplications/applications.styled";
import { usePastApplications } from "../../lib/pastapplications/hooks";
import withAuth from "components/withAuth";

const PastApplications: FC = () => {
	const { data, loading } = usePastApplications();

	return (
		<ApplicationContainer>
			{loading && "Loading..."}
			{data?.length === 0 && "No Applications :("}
			{data?.map(student => (
				<PastApplicationsContainer key={student.user.email}>
					<ImageNameContainer>
						<Box>
							<Image src={student.user.profilePhoto} boxSize="100px" borderRadius="full" alt={student.user.firstName} />
						</Box>
						<Heading as="h6">{student.user.firstName + " " + student.user.lastName}</Heading>
					</ImageNameContainer>
					<ProfileContainer>
						<Box>
							<span className="past-app-profile-heading">{"Email ID: "}</span>
							<span className="past-app-profile-detail">{student.user.email}</span>
						</Box>
						<Box>
							<span className="past-app-profile-heading">{"Contact: "}</span>
							<span className="past-app-profile-detail">{student.user.contact}</span>
						</Box>
						<Box>
							<span className="past-app-profile-heading">{"Competitive Exams: "}</span>
							<span className="past-app-profile-detail">
								{student.testScores.length === 0
									? "NA"
									: student.testScores.map(
											(testScore, index) => testScore.exam + (student.testScores.length === index + 1 ? "" : ", ")
									  )}
							</span>
						</Box>
						<Box>
							<span className="past-app-profile-heading">{"Targeted Universities: "}</span>
							<span className="past-app-profile-detail">
								{student.appliedUniversities.length === 0
									? "NA"
									: student.appliedUniversities.map(
											(uni, index) => uni + (student.appliedUniversities.length === index + 1 ? "" : ", ")
									  )}
							</span>
						</Box>
					</ProfileContainer>
					<AcceptedUniversity>
						<Heading as="h6">ACCEPTED UNIVERSITY</Heading>
						<Heading as="h3">{student.acceptedUniversity ? student.acceptedUniversity : "NA"}</Heading>
					</AcceptedUniversity>
					<TestScoreContainer>
						<Heading as="h6">TEST SCORES</Heading>
						<Box className="past-app-testscore-container">
							{student.testScores.length === 0
								? "NO DATA AVAILABLE"
								: student.testScores.map(testScore => (
										<Box className="past-app-testscore" key={testScore.exam}>
											<span>{testScore.exam}</span>: {testScore.score}
										</Box>
								  ))}
						</Box>
					</TestScoreContainer>
				</PastApplicationsContainer>
			))}
		</ApplicationContainer>
	);
};

export default withAuth(PastApplications);
