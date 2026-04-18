import { Suspense } from "react";
import LoadingConfirmClient from "../../features/confirm/components/loading";
import ConfirmClient from "@/features/confirm/components/confirm-page";
import { getAttendeesForDate } from "@/server/services/attendee.service";

export const metadata = {
    title: "Jumeuc - Liderança",
    description: "Confirme a presença dos participantes no encontro de hoje",
};

export const dynamic = "force-dynamic"

async function ConfirmPage() {
    const attendees = await getAttendeesForDate(new Date());

    return (
        <ConfirmClient attendees={attendees} loading={false}/>
    )

}

export default async function Page() {
    

    return (
        <Suspense fallback={<LoadingConfirmClient />}>
            <ConfirmPage />
        </Suspense>
    )
}