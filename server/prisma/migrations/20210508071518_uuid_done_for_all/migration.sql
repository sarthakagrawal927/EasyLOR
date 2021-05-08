/*
  Warnings:

  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TestScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_userID_fkey";

-- DropForeignKey
ALTER TABLE "LORApplication" DROP CONSTRAINT "LORApplication_facultyID_fkey";

-- DropForeignKey
ALTER TABLE "LORApplication" DROP CONSTRAINT "LORApplication_studentID_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_facultyID_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_studentID_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userID_fkey";

-- DropForeignKey
ALTER TABLE "TestScore" DROP CONSTRAINT "TestScore_studentID_fkey";

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("userID");

-- AlterTable
ALTER TABLE "LORApplication" ALTER COLUMN "studentID" SET DATA TYPE TEXT,
ALTER COLUMN "facultyID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Reminder" ALTER COLUMN "facultyID" SET DATA TYPE TEXT,
ALTER COLUMN "studentID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("userID");

-- AlterTable
ALTER TABLE "TestScore" DROP CONSTRAINT "TestScore_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studentID" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "TestScore_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Faculty" ADD FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LORApplication" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LORApplication" ADD FOREIGN KEY ("facultyID") REFERENCES "Faculty"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD FOREIGN KEY ("facultyID") REFERENCES "Faculty"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestScore" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
