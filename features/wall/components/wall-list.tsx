import AttendanceTableComponent from "@/shared/components/attendance-table/attendance-table";
import ListSkelletonComponent from "@/shared/components/list-skelleton/list-skelleton";
import { WallListProps } from "../types";

export default function WallList({isPending, mostAttendance} : WallListProps) {
    return (
        <div className="rounded-2xl w-1/2 h-2/3 bg-card p-10 z-10 flex justify-center items-center">
            {isPending ? (
                <ListSkelletonComponent />
            ) : (
                <AttendanceTableComponent topAttendants={mostAttendance}/>
            )}
        </div>
    )
}