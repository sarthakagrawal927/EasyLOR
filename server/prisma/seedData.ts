import { Department, CreateUserInput, LorApplication } from "../src/types/graphql";

export const departments: Department[] = [
	{
		id: "4dd6edc1-40e9-4714-a91a-4d3d191b2d9e",
		name: "ICT",
	},
	{
		id: "0887dd2c-84a6-4bf7-bc71-7d91c2e09f26",
		name: "CCE",
	},
	{
		id: "5789a6f2-1602-4cb7-ab95-2ae538cf8cef",
		name: "CSE",
	},
	{
		id: "ac24309b-3ca4-4af3-ba33-0ef2fb51c19f",
		name: "EEE",
	},
];

export const users: (Omit<CreateUserInput, "departmentID"> & { departmentName: string })[] = [
	{
		email: "student@example.com",
		password: "123456",
		firstName: "Nishan",
		lastName: "Almeida",
		institution: "MIT",
		contact: "98784565327",
		profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZTtK6pHqjvMrFvkwyTP_WgXYLrSAdna_8w&usqp=CAU",
		regNo: "18065448",
		departmentName: "ICT",
		userType: "STUDENT",
	},
	{
		email: "sarthak@example.com",
		password: "123456",
		firstName: "Sarthak",
		lastName: "Agarwal",
		institution: "MIT",
		contact: "9224135674",
		profilePhoto:
			"https://www.timeshighereducation.com/sites/default/files/pa-consulting-modern-student-istock-1152767923.jpg",
		regNo: "18065895",
		departmentName: "CSE",
		userType: "STUDENT",
	},
	{
		email: "karan@example.com",
		password: "123456",
		firstName: "Karan",
		lastName: "Hejmadi",
		institution: "MIT",
		contact: "9574265842",
		profilePhoto: "https://www.interactivebrokers.co.in/images/web/open-student-acct-v2.jpg",
		regNo: "180233599",
		departmentName: "CCE",
		userType: "STUDENT",
	},
	{
		email: "megha@example.com",
		password: "123456",
		firstName: "Megha",
		lastName: "Joshi",
		institution: "MIT",
		contact: "9823485678",
		profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrUDVpWxtpoPgfDZibI3gD_qxNRjOANBrY3g&usqp=CAU",
		regNo: "180465237",
		departmentName: "EEE",
		userType: "STUDENT",
	},
	{
		email: "sid@example.com",
		password: "123456",
		firstName: "Sid",
		lastName: "Sharma",
		institution: "MIT",
		contact: "9826182348",
		profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPDexk-rLKZnk7x67jSnssyS24P9uFPL4Qw&usqp=CAU",
		regNo: "180628487",
		departmentName: "ICT",
		userType: "STUDENT",
	},
	{
		email: "faculty@example.com",
		password: "123456",
		firstName: "Giridhar",
		lastName: "Shetty",
		institution: "MIT",
		contact: "9523457862",
		profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUoX6vi4I4xW00QK97_hwRT0kWx6uX2DdMgA&usqp=CAU",
		departmentName: "ICT",
		userType: "FACULTY",
	},
	{
		email: "mahesh@example.com",
		password: "123456",
		firstName: "Mahesh",
		lastName: "Singh",
		institution: "MIT",
		contact: "9815782348",
		profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mKVoDmigf1J_RHiZvKEQB98mgYGBySuJPw&usqp=CAU",
		departmentName: "CCE",
		userType: "FACULTY",
	},
	{
		email: "manohar@example.com",
		password: "123456",
		firstName: "Manhora",
		lastName: "Pai",
		institution: "MIT",
		contact: "9852357826",
		profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSimH1lo9W1lyuxtp-F2emQ6OTKgdSQPSvCqw&usqp=CAU",
		departmentName: "ICT",
		userType: "FACULTY",
	},
	{
		email: "anuradha@example.com",
		password: "123456",
		firstName: "Anuradha",
		lastName: "Rao",
		institution: "MIT",
		contact: "9245786258",
		profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkDlMlvXE1U7gyRfXj7WNTPUSRs-AbK1iusA&usqp=CAU",
		departmentName: "EEE",
		userType: "FACULTY",
	},
	{
		email: "sanjay@example.com",
		password: "123456",
		firstName: "Sanjay",
		lastName: "Singh",
		institution: "MIT",
		contact: "9325784526",
		profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLkHinGVLaQOFm6k0Zg8whZf2QZzT-q4hA7w&usqp=CAU",
		departmentName: "CSE",
		userType: "FACULTY",
	},
	{
		email: "admiewqeqwn@example.com",
		password: "123456",
		firstName: "Admin",
		lastName: "Boi",
		institution: "MIT",
		contact: "9999999999",
		profilePhoto:
			"https://27jts3o00yy49vo2y30wem91-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN-300x300.png",
		departmentName: "CSE",
		userType: "ADMIN",
	},
];

export const lorAppliations: (Omit<LorApplication, "id" | "faculty" | "student"> & {
	facultyEmail: string;
	studentEmail: string;
})[] = [
	{
		dueDate: "2021-07-30T02:00:00.000Z",
		statementOfPurpose:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac risus eu ex sodales fringilla. Duis vitae condimentum mauris. Pellentesque sit amet lacinia ligula, quis dictum mi. Curabitur ac enim eget metus ultrices elementum. Sed finibus arcu in dolor consectetur, non molestie nunc lacinia. Pellentesque non dolor eu justo mollis tincidunt et sit amet velit. Vivamus nec interdum ligula, at accumsan elit. Morbi a porta purus, vel rutrum sem. In vitae vestibulum mi. Vestibulum tempor commodo nisl a suscipit. Integer varius tortor ut elit egestas, eu rhoncus nibh varius. Ut porta sem non mattis tincidunt. In eget laoreet arcu. Nullam nec pulvinar velit. Sed fringilla erat sit amet eros hendrerit scelerisque. Mauris id ipsum id augue lobortis accumsan. In nisl augue, varius ac volutpat eget, suscipit a libero. Ut hendrerit eros quis posuere tincidunt. Morbi non ligula vel purus facilisis mattis. Mauris diam magna, finibus sed mi eu, facilisis volutpat dolor. Quisque pellentesque imperdiet dolor in ornare. Mauris gravida quis eros quis rhoncus. Donec dui dui, tempus eu accumsan ut, pulvinar in neque. Fusce vel lacinia nunc. Nulla semper arcu nec justo placerat dapibus. Aenean condimentum ipsum eget erat commodo, id volutpat est tincidunt. Duis at nulla a ante scelerisque.",
		course: "MTech",
		university: "CMU",
		draftURL: "some:url1",
		status: "PENDING",
		facultyEmail: "faculty@example.com",
		studentEmail: "student@example.com",
	},
	{
		statementOfPurpose:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed arcu a urna hendrerit pellentesque pulvinar malesuada nisl. Sed orci lectus, fermentum nec tellus quis, pulvinar facilisis dui. Nulla in ligula dolor. Pellentesque placerat consequat mi, sit amet pellentesque nisi viverra sed. Nunc quis diam venenatis est dignissim fringilla. Fusce orci dui, convallis in urna at, lobortis euismod arcu. Fusce ut fringilla nibh, quis lobortis nisi. Vivamus tincidunt gravida tortor, finibus porta sapien sagittis sit amet. Duis vestibulum mi quis elit luctus tristique. Mauris accumsan dapibus felis. Nam vel auctor massa. Morbi ac tortor tempor, posuere eros in, tempus turpis.",
		course: "MS",
		university: "Stanford",
		status: "REJECTED",
		rejectionReason: "Rejected for good. Do well.",
		facultyEmail: "faculty@example.com",
		studentEmail: "sarthak@example.com",
	},
	{
		dueDate: "2021-12-15T02:00:00.000Z",
		statementOfPurpose:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sollicitudin scelerisque massa id ultricies. Integer placerat consequat felis quis euismod. Vestibulum lacinia massa quis leo gravida accumsan. Mauris ut porttitor nunc, in maximus nibh. Donec semper massa nec tincidunt dictum. Curabitur in aliquet arcu. Nulla vehicula ut ipsum nec imperdiet. Maecenas ut blandit metus. Fusce a mi est. Sed ut venenatis est, in egestas diam. Proin scelerisque rhoncus bibendum. Donec in lacinia metus, et tempus tortor. Quisque dolor tortor, auctor vel elit eu, rhoncus tincidunt odio. Donec fermentum ultricies augue sit amet tincidunt. Ut consectetur pulvinar suscipit. Ut varius, dui quis egestas elementum, risus magna facilisis orci, interdum commodo mauris purus sit amet ante. Donec sollicitudin erat sed est efficitur condimentum. Maecenas vel metus sit amet magna aliquet blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras tellus nunc, pellentesque sit amet vehicula ac.",
		course: "Phd",
		university: "MIT",
		draftURL: "some:url2",
		status: "GRANTED",
		facultyEmail: "faculty@example.com",
		studentEmail: "karan@example.com",
	},
	{
		dueDate: "2021-08-14T02:00:00.000Z",
		statementOfPurpose:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et pharetra eros. Etiam tempus dui et urna malesuada consequat. Donec nisl urna, pulvinar ac libero efficitur, lacinia dictum leo. Sed sed viverra urna. Aenean quis tincidunt risus. Morbi porta vitae sem vitae pharetra. Morbi pulvinar et justo non feugiat. Vestibulum.",
		course: "MTech",
		university: "Toronto",
		status: "PENDING",
		facultyEmail: "manohar@example.com",
		studentEmail: "student@example.com",
	},
	{
		statementOfPurpose:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum et ex eu interdum. Nunc tincidunt lectus libero, vitae fringilla sapien ultrices ac. Ut quam nibh, facilisis vel nisi at.",
		course: "MS",
		university: "UCLA",
		draftURL: "some:url3",
		status: "REJECTED",
		rejectionReason: "Did't feel like granting",
		facultyEmail: "sanjay@example.com",
		studentEmail: "student@example.com",
	},
];
