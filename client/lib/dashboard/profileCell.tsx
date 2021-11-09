import { UserTableCell, BranchText, NameText } from "./dashboard.styled";
import { Image, Grid, GridItem } from "@chakra-ui/react";

const ProfileCell = ({ name, profilePicture, department }) => {
	return (
		<UserTableCell>
			<Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={0}>
				<GridItem colSpan={1}>
					<Image
						borderRadius="100%"
						src={profilePicture}
						alt={name}
						height="3rem"
						width="3rem"
						objectFit="cover"
					/>
				</GridItem>
				<GridItem colSpan={3} marginTop="0.4rem">
					<NameText> {name}</NameText>
					<BranchText> {department} </BranchText>
				</GridItem>
			</Grid>
			<></>
		</UserTableCell>
	);
};

export default ProfileCell;
