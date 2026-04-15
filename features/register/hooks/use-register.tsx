import { useOptimistic, useRef, useState, useTransition } from "react";
import { OptimisticCalendarActionProp } from "../types";
import { redirect } from "next/navigation";
import { toLocalMidnight } from "@/shared/utils/normalize-data";
import { toast } from "sonner";
import { deleteSingleData, saveSingleDate } from "@/shared/services/calendar.service";

export default function useRegister( initialDates : Date[]) {
    const selectedYearRef = useRef<number>(new Date().getFullYear())
    const months = Array.from({ length: 12 }, (_, i) => i);
    const [isPending, startTransition] = useTransition();

    const handleOptimisticDates = (state: Date[], action: OptimisticCalendarActionProp): Date[] => {
        if (action.type === "include") {
            return [...state, action.value as Date]
        }
        return state.filter(date => date !== action.value)
    }

    const [baseDates, setBaseDates] = useState(initialDates)

    const [optimisticDates, addOptimisticDate] =
        useOptimistic(baseDates, handleOptimisticDates)

    const handleButtonClick = async () => {
        redirect(`/checkin`);
    }

    const handleSelectOrUnselectData = async (updatedDate: Date) => {
        const exists = optimisticDates.some(
            d => toLocalMidnight(d).getTime() === toLocalMidnight(updatedDate).getTime()
        );
        startTransition(async () => {
            const normalized = toLocalMidnight(updatedDate)

            addOptimisticDate({
                type: exists ? "exclude" : "include",
                value: normalized
            })

            try {
                if (exists) {
                    await deleteSingleData(normalized)
                    setBaseDates(prev =>
                        prev.filter(d => d.getTime() !== normalized.getTime())
                    )
                } else {
                    await saveSingleDate(normalized)
                    setBaseDates(prev => [...prev, normalized])
                }
            } catch {
                toast.error("Ocorreu um problema! Tente novamente")
                addOptimisticDate({
                    type: exists ? "exclude" : "include",
                    value: normalized
                })
            }
        })
    };

    return {
        selectedYearRef,
        months,
        isPending,
        handleButtonClick,
        handleSelectOrUnselectData,
        optimisticDates
    }
}