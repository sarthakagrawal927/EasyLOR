import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ApolloContext {
    prisma: PrismaClient;
}

export const context: ApolloContext = {
    prisma: prisma,
};
