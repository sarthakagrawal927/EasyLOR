import { UserTableCell, BranchText } from "./adminDashboard.styled";
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
						height="4rem"
						width="4rem"
						objectFit="cover"
					/>
				</GridItem>
				<GridItem colSpan={3} marginLeft="1.4rem" marginTop="0.8rem">
					{name}
					<BranchText> {department} </BranchText>
				</GridItem>
			</Grid>
			<></>
		</UserTableCell>
	);
};

export default ProfileCell;
