-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'GRANTED', 'REJECTED');

-- CreateTable
CREATE TABLE "LORApplication" (
    "id" SERIAL NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "statementOfPurpose" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "draftURL" TEXT NOT NULL,
    "studentID" INTEGER NOT NULL,
    "facultyID" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'PENDING',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "facultyID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,
    "viewed" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestScore" (
    "id" SERIAL NOT NULL,
    "exam" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "studentID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "regNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "institution" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "appliedUniversities" TEXT[],
    "acceptedUniversities" TEXT[],
    "departmentID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "institution" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "lorDraftTemplates" TEXT[],
    "departmentID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LORApplication.studentID_facultyID_unique" ON "LORApplication"("studentID", "facultyID");

-- CreateIndex
CREATE UNIQUE INDEX "Reminder.studentID_facultyID_unique" ON "Reminder"("studentID", "facultyID");

-- CreateIndex
CREATE UNIQUE INDEX "TestScore.exam_score_unique" ON "TestScore"("exam", "score");

-- CreateIndex
CREATE UNIQUE INDEX "Student.regNo_unique" ON "Student"("regNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student.email_unique" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student.contact_unique" ON "Student"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Student.profilePhoto_unique" ON "Student"("profilePhoto");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty.email_unique" ON "Faculty"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty.contact_unique" ON "Faculty"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty.profilePhoto_unique" ON "Faculty"("profilePhoto");

-- AddForeignKey
ALTER TABLE "LORApplication" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LORApplication" ADD FOREIGN KEY ("facultyID") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestScore" ADD FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("departmentID") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD FOREIGN KEY ("departmentID") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
