import { Faculty } from "@/types";

export type FacultySelect = Omit<Faculty, "lorApplications" | "reminders">;
