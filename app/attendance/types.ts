type TopAttendanceReturnProp = {
    name: string,
    position: number,
    percentual: number,
    count: number
}

export type AttendanceClientProps = {
    topAttendants: Array<TopAttendanceReturnProp> | undefined
}