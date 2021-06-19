import React, { FC } from "react";
import {
	NavBarContainer,
	NameContainer,
	RightContainer,
	OptionsContainer,
	PendingContainer,
	PastContainer,
	ApplicationButton,
	ProfileMenuList,
	ImageContainer,
} from "./NavBar.styled";
import { Menu, MenuButton, MenuItem, Image } from "@chakra-ui/react";
import Link from "next/link";
import { User } from "entities/types.graphql";
import { useNavBar } from "./hooks";

type NavBarProps = {
	user: User;
	pastapp?: Boolean;
};

const NavBar: FC<NavBarProps> = ({ user, pastapp }) => {
	const { selected, profileOnClick, remindersOnClick, logoutOnClick } = useNavBar({ pastapp });

	return (
		<NavBarContainer>
			<NameContainer>{user && "Hi, " + user.firstName}</NameContainer>
			<RightContainer>
				<OptionsContainer>
					{user?.userType === "FACULTY" ? (
						<>
							<PendingContainer selected={!selected}>
								<Link href="/dashboard">PENDING APPLICATIONS</Link>
							</PendingContainer>
							<PastContainer selected={selected}>
								<Link href="/pastapplications">PAST APPLICATIONS</Link>
							</PastContainer>
						</>
					) : user?.userType === "STUDENT" ? (
						<Link href="/newapplication">
							<ApplicationButton type="submit" variant="solid">
								NEW APPLICATION
							</ApplicationButton>
						</Link>
					) : null}
				</OptionsContainer>
				<ImageContainer>
					<Menu gutter={25} placement="bottom-end">
						<MenuButton>
							<Image src={user?.profilePhoto} alt={user?.firstName} boxSize="7vh" borderRadius="full" />
						</MenuButton>
						<ProfileMenuList>
							<MenuItem onClick={profileOnClick}>Profile</MenuItem>
							{user?.userType === "STUDENT" ? <MenuItem onClick={remindersOnClick}>Reminders</MenuItem> : null}
							<MenuItem onClick={logoutOnClick}>Logout</MenuItem>
						</ProfileMenuList>
					</Menu>
				</ImageContainer>
			</RightContainer>
		</NavBarContainer>
	);
};

export default NavBar;
