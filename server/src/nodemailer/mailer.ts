import nodemailer from "nodemailer";

type MailOptions = {
	to: string;
	subject: string;
	html: string;
};

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

export const mailer = async (mailOptions: MailOptions) => {
	const info = await transporter.sendMail({
		from: `Easy LOR Portal ${process.env.GMAIL_USER}`,
		to: mailOptions.to,
		subject: mailOptions.subject,
		html: mailOptions.html,
	});

	console.log(info);
};
