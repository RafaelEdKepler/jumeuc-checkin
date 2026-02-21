import { getAttendees } from "@/lib/db";
import CheckinClient from "./checkin-client";

export const metadata = {
    title: "Jumeuc - Check-in",
    description: "Registre sua presença no encontro de hoje ✨",
};

export default async function Page() {    
    let loading = true;

    let attendees: string[] = [];

    try {        
        attendees = await getAttendees();
    } catch (error) {
        console.error("Error fetching attendees:", error);
    } finally {
        loading = false;
    }

    return <CheckinClient initialAttendees={attendees} loading={loading} />;
}