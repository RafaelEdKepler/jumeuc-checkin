import { getAttendeesForDate } from "@/server/services/attendee.service";

export const getAttendeesForDateService = async (date: string) => {
    const [year, month, day] = date.split("-").map(Number);
    const response = await getAttendeesForDate(new Date(Date.UTC(year, month - 1, day)));
    if (response) {
        return response;
    }
    return [];
}