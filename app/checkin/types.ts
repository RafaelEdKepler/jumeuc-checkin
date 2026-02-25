import { Attendee } from "../generated/prisma";

export type CheckinClientProps = {
    initialAttendees: string[];
    loading: boolean;
    verse: string;
};