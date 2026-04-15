import { Attendee } from "@/app/generated/prisma";
import { confirmAttendeeAction } from "@/features/checkin/actions";
import { useState } from "react";
import { toast } from "sonner";
import { getAttendeesForDate } from "../services/get-attendees-for-date";
import SplitPresentsAndNotPresents from "../services/split-presents-not-presents";

export default function useConfirm(attendees: Attendee[]) {
    const [attendeesList, setAttendeesList] = useState(attendees);

    const handleConfirmAttendance = async () => {
        const { confirmedAttendees, notConfirmedAttendees } = SplitPresentsAndNotPresents(attendeesList);

        try {
            await confirmAttendeeAction(confirmedAttendees, notConfirmedAttendees);
            toast.success("Alterações efetuadas com sucesso!")
        } catch (err) {
            toast.error("Ocorreu um problema! Tente novamente")
        }
    }

    const handleUpdateAttendance = (attendeeId: number) => {
        setAttendeesList(prevList => 
            prevList.map(attendee => 
                attendee.id === attendeeId ? { ...attendee, confirmed: !attendee.confirmed } : attendee
            )
        );
    }

    const handleGetAttendeesForDate = async (formData: FormData) => {        
        const date = formData.get("date") as string;
        const attendeesFounded = await getAttendeesForDate(date);
        try {
            if (attendeesFounded) {
                setAttendeesList(attendeesFounded);
            }        
        } catch (err) {
            console.error("Error fetching attendees for date:", err);
        }
    }

    return {
        handleConfirmAttendance,
        handleUpdateAttendance,
        handleGetAttendeesForDate,
        attendeesList
    }
}