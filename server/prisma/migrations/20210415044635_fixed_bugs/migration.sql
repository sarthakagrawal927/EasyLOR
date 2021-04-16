/*
  Warnings:

  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `institution` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `departmentID` on the `Faculty` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `institution` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `departmentID` on the `Student` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'FACULTY');

-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_departmentID_fkey";

-- DropForeignKey
ALTER TABLE "LORApplication" DROP CONSTRAINT "LORApplication_facultyID_fkey";

-- DropForeignKey
ALTER TABLE "LORApplication" DROP CONSTRAINT "LORApplication_studentID_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_studentID_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_departmentID_fkey";

-- DropForeignKey
ALTER TABLE "TestScore" DROP CONSTRAINT "TestScore_studentID_fkey";

-- DropIndex
DROP INDEX "Faculty.profilePhoto_unique";

-- DropIndex
DROP INDEX "Faculty.email_unique";

-- DropIndex
DROP INDEX "Student.profilePhoto_unique";

-- DropIndex
DROP INDEX "Student.email_unique";

-- DropIndex
DROP INDEX "Student.contact_unique";

-- DropIndex
DROP INDEX "Faculty.contact_unique";

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
DROP COLUMN "id",
DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "institution",
DROP COLUMN "contact",
DROP COLUMN "profilePhoto",
DROP COLUMN "departmentID",
ADD COLUMN     "userID" INTEGER NOT NULL,
ADD PRIMARY KEY ("userID");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "institution",
DROP COLUMN "contact",
DROP COLUMN "profilePhoto",
DROP COLUMN "departmentID",
ADD COLUMN     "userID" INTEGER NOT NULL,
ADD PRIMARY KEY ("userID");

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "institution" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "departmentID" INTEGER NOT NULL,
    "userType" "UserType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.contact_unique" ON "User"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "User.profilePhoto_unique" ON "User"("profilePhoto");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("departmentID") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LORApplication" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LORApplication" ADD FOREIGN KEY ("facultyID") REFERENCES "Faculty"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestScore" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
