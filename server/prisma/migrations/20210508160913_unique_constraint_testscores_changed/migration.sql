/*
  Warnings:

  - A unique constraint covering the columns `[exam,studentID]` on the table `TestScore` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TestScore.exam_score_unique";

-- CreateIndex
CREATE UNIQUE INDEX "TestScore.exam_studentID_unique" ON "TestScore"("exam", "studentID");
