-- AlterTable
ALTER TABLE "LORApplication" ALTER COLUMN "draftURL" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT E'STUDENT';
