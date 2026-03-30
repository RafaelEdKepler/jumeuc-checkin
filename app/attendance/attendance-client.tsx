"use client"

import AttendanceTableComponent from "@/components/attendance-table/attendance-table"
import LayoutComponent from "@/components/layout/layout"
import LogoComponent from "@/components/logo/logo"
import { Card } from "@/components/ui/card"
import { AttendanceClientProps } from "./types"
import ListSkelletonComponent from "@/components/list-skelleton/list-skelleton"

export default function AttendanceClientPage({ topAttendants, loading } : AttendanceClientProps) {
    return (
        <LayoutComponent>
            <Card className="min-h-100 lg:p-10 sm:p-20">
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