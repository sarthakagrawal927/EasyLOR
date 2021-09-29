import { FC } from "react";
import withAuth from "components/withAuth";
import NavBar from "components/NavBar/NavBar";
import { useViewApplication } from "lib/viewApplication/hooks";
import {
	ViewApplicationContainer,
	TitleContainer,
	ViewAppHeading,
	ViewAppDetail,
	ProfileContainer,
	StatementOfPurposeContainer,
	SOPDetail,
	DetailsContainer,
	DetailsRow1Container,
	DetailsRow2Container,
	DetailsColumn1Container,
	DetailsColumn2Container,
	ImageContainer,
	DraftContainer,
	DownloadText,
	DraftIcon,
	ButtonsContainer,
} from "lib/viewApplication/viewApplication.styled";
import { Box, Heading, Image, Link } from "@chakra-ui/react";
import RejectModal from "lib/viewApplication/RejectModal/RejectModal";
import { useRouter } from "next/router";
import UploadLORModal from "lib/viewApplication/UploadLORModal/UploadLORModal";

const ViewApplication: FC = () => {
	const router = useRouter();
	const { id } = router.query;
	const { user, student, application, files, getRejectionReason } = useViewApplication(id?.toString());

	return (
		<>
			{application && (
				<>
					<NavBar user={user} />
					<ViewApplicationContainer>
						<TitleContainer>
							<Heading as="h2">APPLICATION</Heading>
						</TitleContainer>
						<ProfileContainer>
							<DetailsContainer>
								<DetailsRow1Container>
									<DetailsColumn1Container>
										<Box>
											<ViewAppHeading>{"Student: "}</ViewAppHeading>
											<ViewAppDetail>
												{student?.user.firstName + " " + student?.user.lastName}
											</ViewAppDetail>
										</Box>
										<Box>
											<ViewAppHeading>{"Branch: "}</ViewAppHeading>
											<ViewAppDetail>{student?.user.department.name}</ViewAppDetail>
										</Box>
									</DetailsColumn1Container>
									<DetailsColumn2Container>
										<Box>
											<ViewAppHeading>{"Email ID: "}</ViewAppHeading>
											<ViewAppDetail>{student?.user.email}</ViewAppDetail>
										</Box>
										<Box>
											<ViewAppHeading>{"Contact: "}</ViewAppHeading>
											<ViewAppDetail> {student?.user.contact}</ViewAppDetail>
										</Box>
									</DetailsColumn2Container>
								</DetailsRow1Container>
								<DetailsRow2Container>
									<Box>
										<ViewAppHeading>{"Competitive Exams: "}</ViewAppHeading>
										<ViewAppDetail>
											{!student?.testScores || student?.testScores.length === 0
												? "NA"
												: student?.testScores?.map(
														(testScore, index) =>
															testScore.exam +
															(student.testScores.length === index + 1 ? "" : ", ")
												  )}
										</ViewAppDetail>
									</Box>
									<Box>
										<ViewAppHeading>{"Targeted Universities: "}</ViewAppHeading>
										<ViewAppDetail>
											{!student?.appliedUniversities || student?.appliedUniversities.length === 0
												? "NA"
												: student?.appliedUniversities?.map(
														(uni, index) =>
															uni +
															(student.appliedUniversities.length === index + 1
																? ""
																: ", ")
												  )}
										</ViewAppDetail>
									</Box>
								</DetailsRow2Container>
							</DetailsContainer>
							<ImageContainer>
								<Image
									src={student?.user.profilePhoto}
									boxSize="9vw"
									borderRadius="full"
									alt={student?.user.firstName}
								/>
							</ImageContainer>
						</ProfileContainer>
						<DraftContainer>
							<ViewAppHeading>{"LOR Draft: "} </ViewAppHeading>
							<span className="view-app detail">
								{application?.draftURL ? (
									<>
										<DraftIcon />
										<Link href={application.draftURL} download>
											<DownloadText> {"DOWNLOAD"}</DownloadText>
										</Link>
									</>
								) : (
									"NA"
								)}
							</span>
						</DraftContainer>
						<StatementOfPurposeContainer>
							<ViewAppHeading>{"Statement of Purpose: "}</ViewAppHeading>
							<br />
							<SOPDetail>
								<ViewAppDetail>{application?.statementOfPurpose}</ViewAppDetail>
							</SOPDetail>
						</StatementOfPurposeContainer>
						<ButtonsContainer>
							{files && files[0] && files[0].name}
							<RejectModal getRejectionReason={getRejectionReason} />

							<UploadLORModal />
						</ButtonsContainer>
					</ViewApplicationContainer>
				</>
			)}
		</>
	);
};

export default withAuth(ViewApplication);
