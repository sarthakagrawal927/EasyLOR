/*
  Warnings:

  - Added the required column `proofOfResult` to the `TestScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "proofOfAcceptance" TEXT;

-- AlterTable
ALTER TABLE "TestScore" ADD COLUMN     "proofOfResult" TEXT NOT NULL;
