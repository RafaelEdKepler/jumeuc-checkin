import { confirmIfIsThereProgram, getAllAttendees } from "@/lib/db";
import CheckinClient from "./checkin-client";
import getBibleVerse from "../utils/get-verse";
import { Calendar } from "../generated/prisma";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Jumeuc - Check-in",
    description: "Registre sua presença no encontro de hoje ✨",
};

export const dynamic = "force-dynamic"

export default async function Page() {    
    let loading = true;

    let attendees: string[] = [];
    let isThereProgramToday: Calendar | null = null;

    const verseInfo = getBibleVerse();    

    try {        
        isThereProgramToday = await confirmIfIsThereProgram(new Date());
        if (isThereProgramToday) {
            attendees = await getAllAttendees();
        }
    } catch (error) {
        redirect("/error")
    } finally {
        loading = false;
    }

    return <CheckinClient initialAttendees={attendees} loading={loading} verse={verseInfo} isThereProgramToday={!!isThereProgramToday}/>;
}