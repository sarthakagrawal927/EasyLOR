import React from "react";
import { useProfile } from "lib/profile/hooks";
import { Container, ProfileContainer } from "lib/profile/profile.styled";
import withAuth from "components/withAuth";
import { colors } from "../../utils/styles";
import { Spinner } from "@chakra-ui/react";
import ProfileForm from "lib/profile/ProfileForm";
import ProfileDetails from "lib/profile/ProfileDetails";
import ProfileAdditionalDetails from "lib/profile/ProfileAdditionalDetails";

const Profile: React.FC = () => {
	const { student, loading, errors, handleSubmit, control, register, updating, watch, reset } = useProfile();
	console.log("student", student);
	return (
		<Container>
			{(loading || updating) && <Spinner color={colors.blue} size="xl" />}
			{!loading && (
				<ProfileContainer>
					<ProfileDetails student={student} />
					{student?.appliedUniversities.length ? (
						<ProfileAdditionalDetails student={student} />
					) : (
						<ProfileForm
							control={control}
							errors={errors}
							handleSubmit={handleSubmit}
							register={register}
							reset={reset}
							watch={watch}
						/>
					)}
				</ProfileContainer>
			)}
		</Container>
	);
};

export default withAuth(Profile);
