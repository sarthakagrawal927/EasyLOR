import { FC } from "react";
import { Heading, Image, Box } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
	PastApplicationsContainer,
	ImageNameContainer,
	ProfileContainer,
	AcceptedUniversity,
	TestScoreContainer,
	ReminderSentTextContainer,
} from "lib/pastapplications/pastapplication/pastApplication.styled";
import { usePastApplications } from "lib/pastapplications/hooks";
import ReminderInput from "lib/pastapplications/reminder/ReminderInput";
import { Student, User } from "entities/types.graphql";

type PastApplicationProps = {
	student: Student;
	facultyUser: User;
};

const PastApplication: FC<PastApplicationProps> = ({ student, facultyUser }) => {
	const { getReminder } = usePastApplications();

	return (
		<PastApplicationsContainer key={student.user.email}>
			<ImageNameContainer>
				<Box>
					<Image
						src={student.user.profilePhoto}
						boxSize="100px"
						borderRadius="full"
						alt={student.user.firstName}
					/>
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
									(testScore, index) =>
										testScore.exam + (student.testScores.length === index + 1 ? "" : ", ")
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
			{student.acceptedUniversity === null || student.testScores.length === 0 ? (
				student.reminders.find(reminder => reminder.facultyID === facultyUser.id) ? (
					<ReminderSentTextContainer>
						{student.reminders.find(reminder => reminder.facultyID === facultyUser.id).viewed
							? "Reminder seen by student"
							: "Reminder has been sent"}
						&nbsp;
						<CheckCircleIcon color="green" />
					</ReminderSentTextContainer>
				) : (
					<ReminderInput
						student={student}
						getReminder={message => getReminder({ student, facultyUser, message })}
					/>
				)
			) : (
				<>
					<AcceptedUniversity>
						<Heading as="h6">{"ACCEPTED UNIVERSITY"}</Heading>
						<Heading as="h3">
							{student.acceptedUniversity ? (
								<a title="Download: Proof of Acceptance" href={student?.proofOfAcceptance}>
									{student.acceptedUniversity}
								</a>
							) : (
								"NA"
							)}
						</Heading>
					</AcceptedUniversity>
					<TestScoreContainer>
						<Heading as="h6">{"TEST SCORES"}</Heading>
						<Box className="past-app-testscore-container">
							{student.testScores.length === 0
								? "NO DATA AVAILABLE"
								: student.testScores.map(testScore => (
										<Box className="past-app-testscore" key={testScore.exam}>
											<a title="Download: Proof of Result" href={testScore.proofOfResult}>
												<span>{testScore.exam}</span>: {testScore.score}
											</a>
										</Box>
								  ))}
						</Box>
					</TestScoreContainer>
				</>
			)}
		</PastApplicationsContainer>
	);
};

export default PastApplication;
