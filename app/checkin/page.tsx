import { AttendeeWithCount, confirmIfIsThereProgram, getAllAttendeesCheckin } from "@/lib/db";
import getBibleVerse from "../../utils/get-verse";
import { Calendar } from "../generated/prisma";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CheckinClient from "@/features/checkin/index";
import LoadingCheckin from "@/features/checkin/components/loading";

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
        isThereProgramToday = await confirmIfIsThereProgram(new Date());
        if (isThereProgramToday) {
            attendees = await getAllAttendeesCheckin();
        }
    } catch (error) {
        redirect("/error")
    }

    return (
        <CheckinClient initialAttendees={attendees} loading={false} verse={verseInfo} isThereProgramToday={!!isThereProgramToday}/>
    )
}

export default async function Page() {    

    return (
        <Suspense fallback={<LoadingCheckin verseInfo={verseInfo} />}>
            <CheckinPage />
        </Suspense>
    )
}