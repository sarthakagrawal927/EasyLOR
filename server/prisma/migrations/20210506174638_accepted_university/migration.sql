/*
  Warnings:

  - You are about to drop the column `acceptedUniversities` on the `Student` table. All the data in the column will be lost.
  - Added the required column `acceptedUniversity` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ALTER COLUMN "viewed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "acceptedUniversities",
ADD COLUMN     "acceptedUniversity" TEXT NOT NULL;
