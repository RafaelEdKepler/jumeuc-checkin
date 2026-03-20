import { getAttendeesForDate } from "@/lib/db";
import ConfirmClient from "./confirm-client";
import { Suspense } from "react";
import Portal from "@/components/portal/portal";

export const metadata = {
    title: "Jumeuc - Liderança",
    description: "Confirme a presença dos participantes no encontro de hoje",
};

export default async function ConfirmPage() {
    
    const attendees = await getAttendeesForDate(new Date());

    return (
        <Suspense fallback={<Portal />}>
            <ConfirmClient attendees={attendees}/>
        </Suspense>
    )
}