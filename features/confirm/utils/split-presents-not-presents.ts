import { Attendee } from "@/app/generated/prisma";

export default function SplitPresentsAndNotPresents(attendees: Attendee[]) {
    const confirmedAttendees = attendees.filter(attendee => attendee.confirmed).map(attendee => attendee.id);
    const notConfirmedAttendees = attendees.filter(attendee => !attendee.confirmed).map(attendee => attendee.id);

    return {
        confirmedAttendees,
        notConfirmedAttendees
    }
}