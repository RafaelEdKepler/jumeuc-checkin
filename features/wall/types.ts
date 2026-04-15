import { TopAttendanceReturnProp } from "@/shared/types/types"

export type WallListProps = {
    isPending: boolean,
    mostAttendance: TopAttendanceReturnProp[]
}

export type WallContentProps = {
    isWhatVisible: number; 
    isPending: boolean;
    mostAttendance: TopAttendanceReturnProp[]
}

export type UserPositionProp = {
    user: {
            name: string;
        initialX: number;
        initialY: number;
        pathX: number[];
        pathY: number[];
        duration: number;
    }
}