import { Calendar } from "../generated/prisma";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CheckinClient from "@/features/checkin/index";
import LoadingCheckin from "@/features/checkin/components/loading";
import getBibleVerse from "@/shared/utils/get-verse";
import { AttendeeWithCount } from "@/shared/types/types";
import { confirmIfIsThereProgram } from "@/server/services/calendar.service";
import { getAllAttendeesCheckin } from "@/server/services/attendee.service";

export const metadata = {
    title: "Jumeuc - Check-in",
    description: "Registre sua presença no encontro de hoje ✨",
};

export const dynamic = "force-dynamic"

const verseInfo = getBibleVerse();    

async function CheckinPage() {
    let attendees: AttendeeWithCount[] = [];
    let isThereProgramToday: Calendar | null = null;

    try {        
        // isThereProgramToday = await confirmIfIsThereProgram(new Date());
        if (true) {
            attendees = await getAllAttendeesCheckin();
        }
    } catch (error) {
        redirect("/error")
    }

    return (
        <CheckinClient initialAttendees={attendees} loading={false} verse={verseInfo} isThereProgramToday={true}/>
    )
}

export default async function Page() {    

    return (
        <Suspense fallback={<LoadingCheckin verseInfo={verseInfo} />}>
            <CheckinPage />
        </Suspense>
    )
}