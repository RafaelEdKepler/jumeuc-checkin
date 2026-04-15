import { getMoreAttendance } from "@/shared/lib/db";
import { Suspense } from "react";
import LoadingAttendanceClient from "@/features/attendance/components/loading";
import AttendanceClientPage from "@/features/attendance";

export const metadata = {
    title: "Jumeuc - Lista de Mais Assíduos",
    description: "Veja em que posição você está!"
}

export const dynamic = "force-dynamic"

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