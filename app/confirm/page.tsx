import { getAttendeesForDate } from "@/lib/db";
import ConfirmClient from "./confirm-client";
import { Suspense } from "react";
import Portal from "@/components/portal/portal";
import LoadingConfirmClient from "./loading";

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