import { Attendee } from "@/app/generated/prisma";

export default interface ListConfirmProps {
    attendees: Array<Attendee>;
    onAttendeePress: (attendeeId: number) => void;
}