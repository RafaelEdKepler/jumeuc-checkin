import { getMoreAttendance } from "@/lib/db";
import AttendanceClientPage from "./attendance-client";
import { Suspense } from "react";
import LoadingAttendanceClient from "./loading";

export const metadata = {
    title: "Jumeuc - Lista de Mais Assíduos",
    description: "Veja em que posição você está!"
}

async function Attendance() {
    
    const topAttendees = await getMoreAttendance();    
    
    return (
        <AttendanceClientPage topAttendants={topAttendees} loading={false}/>
    )
}

export default async function AttendancePage() {
    return (
        <Suspense fallback={<LoadingAttendanceClient />}>
            <Attendance />
        </Suspense>
    )
}