"use client"

import AttendanceTableComponent from "@/shared/components/attendance-table/attendance-table"
import LayoutComponent from "@/shared/components/layout/layout"
import LogoComponent from "@/shared/components/logo/logo"
import { Card } from "@/shared/components/ui/card"
import { AttendanceClientProps } from "./types"
import ListSkelletonComponent from "@/shared/components/list-skelleton/list-skelleton"

export default function AttendanceClientPage({ topAttendants, loading } : AttendanceClientProps) {
    return (
        <LayoutComponent>
            <Card className="min-h-100 w-full lg:p-10 sm:p-20">
                <LogoComponent />
                <h2 className="text-1xl font-bold text-center">Os mais assíduos da JUMEUC!</h2>
                {loading ? (
                    <ListSkelletonComponent />
                ) : (
                    <AttendanceTableComponent topAttendants={topAttendants}/>
                )}
            </Card>
        </LayoutComponent>
    )
}