import React from "react";
import { Student } from "context/student";
import {
	ProfileAdditionalDetailsContainer,
	TestScore,
	AppliedUniversities,
	AppliedUniversitiesList,
	AcceptedUniversity,
	TestScoresAdditionalContainer,
	TestScoresAdditionalFieldContainer,
} from "lib/profile/profile.styled";

import { Link, Text, Stack, Icon } from "@chakra-ui/react";
import Certificate from "../../components/icons/Certifcate";

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
									RESULT
								</Link>
							</TestScore>
						);
					})}
				</TestScoresAdditionalFieldContainer>
			</TestScoresAdditionalContainer>
			<AcceptedUniversity>
				<Text>Accepted University</Text>
				<Stack direction="row" paddingTop="4">
					<Text color="blue" fontSize="large">
						{student.acceptedUniversity ?? "NOT MENTIONED"}
					</Text>
					{student.proofOfAcceptance && (
						<Link href={student.proofOfAcceptance}>
							<Certificate boxSize={8} />
						</Link>
					)}
				</Stack>
			</AcceptedUniversity>
		</ProfileAdditionalDetailsContainer>
	);
};

export default ProfileAdditionalDetails;
