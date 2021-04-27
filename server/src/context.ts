import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: [
        { emit: "stdout", level: "query" },
        { emit: "stdout", level: "info" },
        { emit: "stdout", level: "error" },
    ],
});

export interface ApolloContext {
    prisma: PrismaClient;
}

export const context: ApolloContext = {
    prisma: prisma,
};
