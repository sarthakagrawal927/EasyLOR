import React from "react";
import { Student } from "context/student";
import {
	ProfileAdditionalDetailsContainer,
	TestScore,
	AppliedUniversities,
	AppliedUniversitiesList,
	AcceptedUniversity,
	ProofOfAcceptance,
	TestScoresAdditionalContainer,
	TestScoresAdditionalFieldContainer,
} from "lib/profile/profile.styled";

import { Link, Text } from "@chakra-ui/react";
type ProfileAdditionalDetailsProps = {
	student: Pick<Student, "acceptedUniversity" | "appliedUniversities" | "testScores" | "proofOfAcceptance">;
};

const ProfileAdditionalDetails: React.FC<ProfileAdditionalDetailsProps> = ({ student }) => {
	return (
		<ProfileAdditionalDetailsContainer>
			<AppliedUniversities>
				<Text>Applied Universities</Text>
				<AppliedUniversitiesList>{student.appliedUniversities.join(", ")}</AppliedUniversitiesList>
			</AppliedUniversities>
			<TestScoresAdditionalContainer>
				<Text>Test Scores</Text>
				<TestScoresAdditionalFieldContainer>
					{student.testScores.map(({ exam, score, proofOfResult, id }) => {
						return (
							<TestScore key={id}>
								<Text>{exam}</Text>
								<Text>{score}</Text>
								<Link href={proofOfResult} color="blue">
									{proofOfResult}
								</Link>
							</TestScore>
						);
					})}
				</TestScoresAdditionalFieldContainer>
			</TestScoresAdditionalContainer>
			<AcceptedUniversity>
				<Text>Accepted University</Text>
				<Text color="blue" fontSize="large" marginTop="4">
					{student.acceptedUniversity ?? "NOT MENTIONED"}
				</Text>
			</AcceptedUniversity>
			<ProofOfAcceptance>
				<Text>Proof Of Acceptance</Text>
				<Link href={student.proofOfAcceptance} color="blue">
					{student.proofOfAcceptance}
				</Link>
			</ProofOfAcceptance>
		</ProfileAdditionalDetailsContainer>
	);
};

export default ProfileAdditionalDetails;
