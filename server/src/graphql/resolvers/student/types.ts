import { Student } from "@/types";

export type StudentSelect = Omit<Student, "testScores" | "lorApplications" | "reminders">;
