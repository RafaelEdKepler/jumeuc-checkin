import { AttendeeWithCount, getHowManyAttendance } from "@/shared/lib/db";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import { checkIn } from "../actions";
import { UseCheckinProps } from "../types";
import { updateAttendees } from "../services/update-attendees";
import { mergeOptimisticAttendee } from "../services/merge-optimistic-attendee";
import { getAttendanceMessage } from "../services/get-attendance-message";
import { STORAGE_KEYS } from "@/shared/constants/enums";

export default function useCheckin({ initialAttendees } : UseCheckinProps) {
    const [storedNames, setStoredNames] = useState<string[]>([]);
    const [attendees, setAttendees] = useState<AttendeeWithCount[]>(initialAttendees)
    const [isPending, startTransition] = useTransition();
    const [optimisticAttendees, addOptimisticAttendees] =
    useOptimistic(attendees, mergeOptimisticAttendee);

    const handleCheckIn = async (formData: FormData) => {
        startTransition(async () => {
            const name = formData.get("name") as string;
            if (!name) return;
    
            addOptimisticAttendees({name, count: 1});
            
            setStoredNames(prev => {
                if (prev.includes(name)) return prev;
                const updated = [...prev, name];
                localStorage.setItem(STORAGE_KEYS.CHECKIN_NAMES, JSON.stringify(updated));
                return updated;
            });
    
            try {
                await checkIn(formData);
                const howManyAttendance = await getHowManyAttendance(name);
                setAttendees(prev => updateAttendees(prev, name, howManyAttendance));
                toast(getAttendanceMessage(howManyAttendance))
            } catch {
                toast.error("Ocorreu um problema! Tente novamente");
            }
        })
    };


    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.CHECKIN_NAMES);
        if (saved) {
            setStoredNames(JSON.parse(saved));
        }
    }, []);

    return {
        storedNames,
        isPending,
        optimisticAttendees,
        handleCheckIn,        
    }
}