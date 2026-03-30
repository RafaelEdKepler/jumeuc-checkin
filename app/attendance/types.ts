export type TopAttendanceReturnProp = {
    name: string,
    position: number,
    percentual: string,
    count: number
}

export type AttendanceClientProps = {
    topAttendants: Array<TopAttendanceReturnProp>;
    loading: boolean
}