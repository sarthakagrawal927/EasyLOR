import { PrismaClient } from "@prisma/client";
import { ExpressContext, ApolloServerExpressConfig } from "apollo-server-express/src/ApolloServer";

const prisma = new PrismaClient({
	log: [
		{ emit: "stdout", level: "query" },
		{ emit: "stdout", level: "info" },
		{ emit: "stdout", level: "error" },
	],
});

export interface ApolloContext extends ExpressContext {
	prisma: PrismaClient;
}

export const context: ApolloServerExpressConfig["context"] = ({ req }) => ({
	req,
	prisma,
});
