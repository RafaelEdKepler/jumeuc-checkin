import AttendanceClientPage from "./attendance-client";

export default function LoadingAttendanceClient() {
    return (
         <AttendanceClientPage topAttendants={[]} loading={true}/>
    )
}