import { AttendeeWithCount } from "@/shared/types/types";

export type CheckinClientProps = {
    initialAttendees: AttendeeWithCount[];
    loading: boolean;
    verse: string;
    isThereProgramToday?: boolean;
};

export type UseCheckinProps = {
    initialAttendees: AttendeeWithCount[];
}

export type TabsCheckinComponentProps = {
    storedNames: string[],
    loading: boolean,
    selectedTab: string,
    setSelectedTab: (selectedTab: string) => void
}

export type FormFieldsComponentProps = {
    storedNames: string[],
    loading: boolean,
    disabled: boolean
}