/*
  Warnings:

  - You are about to drop the column `lorDraftTemplates` on the `Faculty` table. All the data in the column will be lost.
  - Added the required column `lorDraftTemplate` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "lorDraftTemplates",
ADD COLUMN     "lorDraftTemplate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LORApplication" ADD COLUMN     "lorURL" TEXT;
