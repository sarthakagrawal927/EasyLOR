import React from "react";
import {
	ProfileDetails as Details,
	ProfileHeading,
	ProfileAvatar,
	ProfileInfo,
	ProfilePhoto,
	InfoField,
	InfoFieldContainer,
	InfoFieldLabel,
	InfoFieldText,
} from "lib/profile/profile.styled";
import { Student } from "context/student";

type ProfileDetailsProps = {
	student: Student;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ student }) => {
	return (
		<Details>
			<ProfilePhoto>
				<ProfileHeading>Profile</ProfileHeading>
				<ProfileAvatar name={student?.user?.firstName} src={student?.user?.profilePhoto} />
			</ProfilePhoto>
			<ProfileInfo>
				<InfoFieldContainer>
					<InfoField>
						<InfoFieldLabel>Name</InfoFieldLabel>
						<InfoFieldText>{`${student?.user?.firstName} ${student?.user?.lastName}`}</InfoFieldText>
					</InfoField>
					<InfoField>
						<InfoFieldLabel>Registration Number</InfoFieldLabel>
						<InfoFieldText>{student?.regNo}</InfoFieldText>
					</InfoField>
				</InfoFieldContainer>
				<InfoFieldContainer>
					<InfoField>
						<InfoFieldLabel>Institute</InfoFieldLabel>
						<InfoFieldText width={"600px"}>{student?.user?.institution}</InfoFieldText>
					</InfoField>
				</InfoFieldContainer>
				<InfoFieldContainer>
					<InfoField>
						<InfoFieldLabel>Contact</InfoFieldLabel>
						<InfoFieldText>{student?.user?.contact}</InfoFieldText>
					</InfoField>

					<InfoField>
						<InfoFieldLabel>Email</InfoFieldLabel>
						<InfoFieldText>{student?.user?.email}</InfoFieldText>
					</InfoField>
				</InfoFieldContainer>
			</ProfileInfo>
		</Details>
	);
};

export default ProfileDetails;
