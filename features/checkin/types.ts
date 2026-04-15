import { AttendeeWithCount } from "@/shared/types/types";

export type CheckinClientProps = {
    initialAttendees: AttendeeWithCount[];
    loading: boolean;
    verse: string;
    isThereProgramToday?: boolean;
};

export type UseCheckinProps = {
    initialAttendees: AttendeeWithCount[];
}