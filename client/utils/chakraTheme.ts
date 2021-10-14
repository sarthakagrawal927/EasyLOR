import { extendTheme } from "@chakra-ui/react";
import { colors, shadow } from "./styles";

const Button = {
	// The styles all button have in common
	baseStyle: {
		fontWeight: "bold",
		textTransform: "uppercase",
		borderRadius: "base", // <-- border radius is same for all variants and sizes
		fontFamily: "Nunito",
	},
	// Two sizes: sm and md
	sizes: {
		sm: {
			fontSize: "sm",
			px: 4, // <-- px is short for paddingLeft and paddingRight
			py: 3, // <-- py is short for paddingTop and paddingBottom
		},
		md: {
			fontSize: "md",
			px: 6, // <-- these values are tokens from the design system
			py: 4, // <-- these values are tokens from the design system
		},
	},
	// Two variants: outline and solid
	variants: {
		outline: {
			border: "2px solid",
			borderColor: colors.blue,
			color: colors.blue,
			boxShadow: shadow.buttonShadow,
		},
		solid: {
			bg: colors.blue,
			color: "white",
			boxShadow: shadow.buttonShadow,
		},
	},
	// The default size and variant values
	defaultProps: {
		size: "lg",
		variant: "outline",
	},
};

const Box = {
	variants: {
		shadow: {
			boxShadow: shadow.buttonShadow,
		},
	},
};

export const theme = extendTheme({
	colors: {
		blue: colors.blue,
		lightBlue: colors.lightBlue,
		green: colors.green,
		red: colors.red,
		gray: colors.gray,
		lightGray: colors.lightGray,
	},
	components: {
		Button,
		Box,
	},
});
