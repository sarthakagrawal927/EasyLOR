import React from "react";
import {
	Container,
	DetailProperty,
	DetailsContainer,
	DetailValue,
	DraftContainer,
	ProfileAvatar,
	ProfileDetail,
	ProfileHeading,
	ProfilePhotoContainer,
	TopContainer,
	UploadDraftButton,
} from "lib/facultyProfile/facultyProfile.styled";
import withAuth from "components/withAuth";
import NavBar from "components/NavBar/NavBar";
import { useFacultyProfile } from "lib/facultyProfile/hooks";
import FileUpload from "components/FileUpload/FileUpload";

const FacultyProfile = () => {
	const { faculty, register } = useFacultyProfile();
	return (
		<>
			<NavBar user={faculty?.user} />
			<Container>
				<TopContainer>
					<ProfilePhotoContainer>
						<ProfileHeading>Profile</ProfileHeading>
						<ProfileAvatar src={faculty?.user?.profilePhoto} size="2xl" />
					</ProfilePhotoContainer>
					<DraftContainer>
						<FileUpload
							register={register("draft")}
							accept={".doc,.docx,.pdf"}
							multiple={false}
							fromNewApplication={true}
						>
							<UploadDraftButton type="button" variant="solid">
								Upload Draft
							</UploadDraftButton>
						</FileUpload>
					</DraftContainer>
				</TopContainer>
				<DetailsContainer>
					<ProfileDetail>
						<DetailProperty>Name</DetailProperty>
						<DetailValue>{`${faculty?.user?.firstName} ${faculty?.user?.lastName ?? null}`}</DetailValue>
					</ProfileDetail>
					<ProfileDetail>
						<DetailProperty>Department</DetailProperty>
						<DetailValue>{faculty?.user?.department?.name}</DetailValue>
					</ProfileDetail>
					<ProfileDetail>
						<DetailProperty>Contact</DetailProperty>
						<DetailValue>{faculty?.user?.contact}</DetailValue>
					</ProfileDetail>
					<ProfileDetail>
						<DetailProperty>Email ID</DetailProperty>
						<DetailValue>{faculty?.user?.email}</DetailValue>
					</ProfileDetail>
				</DetailsContainer>
			</Container>
		</>
	);
};

export default withAuth(FacultyProfile);
