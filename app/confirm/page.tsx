import { getAttendeesForDate } from "@/lib/db";
import ConfirmClient from "./confirm-client";
import { use } from "react";

export const metadata = {
    title: "Jumeuc - Liderança",
    description: "Confirme a presença dos participantes no encontro de hoje",
};

export default async function ConfirmPage() {
    
    const attendees = await getAttendeesForDate(new Date());        

    return (
        <ConfirmClient attendees={attendees}/>
    )
}