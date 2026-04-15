import { getAllAttendees, getMoreAttendance } from "@/shared/lib/db";
import { TopAttendanceReturnProp } from "@/shared/types/types";
import { useEffect, useMemo, useState, useTransition } from "react";
import SetUserPositions from "../utils/set-user-positions";
import { UserPositionProp } from "../types";

export default function useWall() {
    const [users, setUsers] = useState<string[]>([]);
    const [isWhatVisible, setIsWhatVisible] = useState<number>(1);
    const [mostAttendance, setMostAttendance] = useState<TopAttendanceReturnProp[]>([]);
    const [ isPending, startTransition ] = useTransition();

    const defineWhatWillBeVisible : Record<string, () => void> = {
        "PageUp": () => setIsWhatVisible(prev => prev < 2 ? prev + 1 : prev),
        "PageDown": () => setIsWhatVisible(prev => prev > 0 ? prev - 1 : prev)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        const action = defineWhatWillBeVisible[e.key]
        action && action()
    }
    
    const userPositions = useMemo(() => SetUserPositions(users), [users]);

    useEffect(() => {        
        const fetchUsers = async () => {
            const usersUpdated = await getAllAttendees()
            setUsers((prev) => {
                if (usersUpdated.length !== prev.length) {
                    return usersUpdated
                }
                return prev
            })
        }
        const fetchAttendees = async () => {
            const attendance = await getMoreAttendance();
            setMostAttendance(attendance);
        }

        const interval = setInterval(fetchUsers, 2000)

        fetchUsers()
        startTransition(() => {
            fetchAttendees();
        })

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(interval)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return {
        isWhatVisible,
        mostAttendance,
        isPending,
        userPositions,        
    }
}