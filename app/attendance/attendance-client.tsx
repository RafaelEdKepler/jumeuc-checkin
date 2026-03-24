"use client"

import AttendanceTableComponent from "@/components/attendance-table/attendance-table"
import LayoutComponent from "@/components/layout/layout"
import LogoComponent from "@/components/logo/logo"
import { Card } from "@/components/ui/card"
import { AttendanceClientProps } from "./types"

export default function AttendanceClientPage({ topAttendants } : AttendanceClientProps) {
    return (
        <LayoutComponent>
            <Card className="p-10 min-h-100">
                <LogoComponent />
                <h2 className="text-1xl font-bold text-center">Os mais assíduos da JUMEUC!</h2>
                <AttendanceTableComponent topAttendants={topAttendants}/>
            </Card>
        </LayoutComponent>
    )
}