export type CalendarProp = {
    id: number,
    createdAt: Date,
    leader: string | null,
    date: Date
}

export type RegisterClientProps = {
    initialDates: Date[]
}

export type OptimisticCalendarActionProp = {
    type: "include" | "exclude",
    value: Date | Date[]
}