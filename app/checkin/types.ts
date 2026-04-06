import { AttendeeWithCount } from "@/lib/db";

export type CheckinClientProps = {
    initialAttendees: AttendeeWithCount[];
    loading: boolean;
    verse: string;
    isThereProgramToday?: boolean;
};