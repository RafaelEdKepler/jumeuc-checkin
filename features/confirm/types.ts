import { Attendee } from "@/app/generated/prisma";

export default interface ConfirmClientProps {
    attendees: Attendee[];
    loading: boolean;
}