"use client"

import LayoutComponent from "@/components/layout/layout"
import Portal from "@/components/portal/portal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { deleteSingleData, getDates, saveSingleDate } from "@/lib/db"
import { useMemo, useOptimistic, useRef, useState, useTransition } from "react"
import { DayPicker } from "react-day-picker"
import 'react-day-picker/style.css'
import { CalendarProp, OptimisticCalendarActionProp, RegisterClientProps } from "./types"
import { redirect } from "next/navigation"
import { normalizeDate } from "../../utils/normalize-data"
import { toast } from "sonner"

export default function RegisterClient({ initialDates } : RegisterClientProps) {        
    const selectedYearRef = useRef<number>(new Date().getFullYear())
    const months = Array.from({length: 12}, (_, i) => i);
    const [isPending, startTransition] = useTransition();
    const [dates, setDates] = useState(initialDates.map(date => date.date));
    
    const handleOptimisticDates = (state: Date[], action: OptimisticCalendarActionProp) : Date[] => {
        if (action.type === "include") {
            return [...state, action.value as Date]
        }
        return state.filter(date => date !== action.value)
    }

    const [optimisticDates, addOptimisticDate] = useOptimistic(dates, handleOptimisticDates);

    const optionYears = useMemo(() => {
        const newDate = new Date()
        const actualYear = newDate.getFullYear();
        let yearBeingReeded = actualYear - 5;
        selectedYearRef.current = actualYear;
        const years : Array<number> = [];
        while (yearBeingReeded < actualYear + 5) {
            years.push(yearBeingReeded);
            yearBeingReeded++
        }
        return years;
    }, [])

    const handleButtonClick = async () => {
        redirect(`/checkin`);
    }

    const handleSelectOrUnselectData = async (updatedDate: Date) => {
        const exists = optimisticDates.some(
        d => normalizeDate(d).getTime() === normalizeDate(updatedDate).getTime()
        );
        startTransition(async () => {
            addOptimisticDate({
                type: exists ? "exclude" : "include",
                value: updatedDate
            });

            try {
                if (exists) {
                    await deleteSingleData(updatedDate);
                } else {
                    await saveSingleDate(updatedDate);
                }
            } catch {
                toast.error("Ocorreu um problema! Tente novamente");
                addOptimisticDate({ type: exists ? "exclude" : "include", value: updatedDate });
            }
        });
    };

    const handleChangeYear = async (year: string) => {        
        startTransition(async () => {
            try {
                const datesOfTheSelectedYear : CalendarProp[] = await getDates(Number(year))
                selectedYearRef.current = Number(year);
                setDates(datesOfTheSelectedYear.map(date => date.date));
            } catch {
                toast.error("Ocorreu um problema! Tente novamente")
            }
        })
    }
    
    return (
        <LayoutComponent>
            {isPending && <Portal />}
            <Card className="w-19/20 h-full relative">
                <Button className="absolute top-4 right-4" onClick={() =>  handleButtonClick()}>Voltar</Button>
                <div className="flex justify-center pt-4">
                    <select value={selectedYearRef.current} className="border-1 rounded w-30" onChange={(e) => handleChangeYear(e.target.value)}>
                        {optionYears.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}                        
                    </select>
                </div>
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