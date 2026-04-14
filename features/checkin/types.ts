import { AttendeeWithCount } from "@/shared/lib/db";

export type CheckinClientProps = {
    initialAttendees: AttendeeWithCount[];
    loading: boolean;
    verse: string;
    isThereProgramToday?: boolean;
};

export type UseCheckinProps = {
    initialAttendees: AttendeeWithCount[];
}