/*
  Warnings:

  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departmentID_fkey";

-- AlterTable
ALTER TABLE "Department" DROP CONSTRAINT "Department_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Department_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "departmentID" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("departmentID") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
