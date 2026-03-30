import { Attendee } from "../generated/prisma";



export default interface ConfirmClientProps {
    attendees: Attendee[];
    loading: boolean;
}