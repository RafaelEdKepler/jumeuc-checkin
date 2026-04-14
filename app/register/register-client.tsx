"use client"

import 'react-day-picker/style.css'
import LayoutComponent from "@/shared/components/layout/layout"
import Portal from "@/shared/components/portal/portal"
import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { deleteSingleData, saveSingleDate } from "@/shared/lib/db"
import { useOptimistic, useRef, useState, useTransition } from "react"
import { DayPicker } from "react-day-picker"
import { OptimisticCalendarActionProp, RegisterClientProps } from "./types"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { toLocalMidnight } from '@/shared/utils/normalize-data'

export default function RegisterClient({ initialDates }: RegisterClientProps) {
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

    return (
        <LayoutComponent>
            {isPending && <Portal />}
            <Card className="w-19/20 h-full relative">
                <Button className="absolute top-4 right-4" onClick={() => handleButtonClick()}>Voltar</Button>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {months.map(month => (
                        <div key={`${selectedYearRef.current}-${month}`} className="p-2 m-2 flex justify-center align-middle items-center">
                            <DayPicker
                                month={new Date(selectedYearRef.current, month)}
                                mode="multiple"
                                selected={optimisticDates}
                                onDayClick={handleSelectOrUnselectData}
                                animate
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </LayoutComponent>
    )
}