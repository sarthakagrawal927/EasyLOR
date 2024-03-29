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
import { useRouter } from "next/router";
import AvatarPlaceholder from "../icons/AvatarPlaceholder";

type NavBarProps = {
	user: User;
	pastapp?: Boolean;
};

const NavBar: FC<NavBarProps> = ({ user, pastapp }) => {
	const { selected, handleProfile, handleReminder, handleLogout } = useNavBar({ pastapp });
	const router = useRouter();
	return (
		<NavBarContainer>
			<NameContainer onClick={() => router.push("/dashboard")}>
				{user && (user?.userType === "ADMIN" ? "Admin Dashboard" : "Hi, " + user.firstName)}
			</NameContainer>
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
						<Link href="/newApplication">
							<ApplicationButton type="submit" variant="solid">
								NEW APPLICATION
							</ApplicationButton>
						</Link>
					) : null}
				</OptionsContainer>
				<ImageContainer>
					<Menu gutter={25} placement="bottom-end">
						<MenuButton>
							{user?.profilePhoto ? (
								<Image
									src={user?.profilePhoto}
									alt={user?.firstName}
									boxSize="7vh"
									borderRadius="full"
								/>
							) : (
								<AvatarPlaceholder />
							)}
						</MenuButton>
						<ProfileMenuList>
							{user?.userType !== "ADMIN" && <MenuItem onClick={handleProfile}>Profile</MenuItem>}
							{user?.userType === "STUDENT" ? (
								<MenuItem onClick={handleReminder}>Reminders</MenuItem>
							) : null}
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</ProfileMenuList>
					</Menu>
				</ImageContainer>
			</RightContainer>
		</NavBarContainer>
	);
};

export default NavBar;
