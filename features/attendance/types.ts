import { TopAttendanceReturnProp } from "@/shared/types/types";

export type AttendanceClientProps = {
    topAttendants: Array<TopAttendanceReturnProp>;
    loading: boolean
}