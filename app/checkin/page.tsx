import { getAttendees } from "@/lib/db";
import CheckinClient from "./checkin-client";
import getBibleVerse from "../utils/get-verse";

export const metadata = {
    title: "Jumeuc - Check-in",
    description: "Registre sua presença no encontro de hoje ✨",
};

export default async function Page() {    
    let loading = true;

    let attendees: string[] = [];

    const verseInfo = getBibleVerse();    

    try {        
        attendees = await getAttendees();
    } catch (error) {
        console.error("Error fetching attendees:", error);
    } finally {
        loading = false;
    }

    return <CheckinClient initialAttendees={attendees} loading={loading} verse={verseInfo}/>;
}