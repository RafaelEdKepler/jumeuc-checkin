"use client"

import LayoutComponent from "@/components/layout/layout"
import Portal from "@/components/portal/portal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getDates, saveDates } from "@/lib/db"
import { use, useMemo, useState, useTransition } from "react"
import { DayPicker } from "react-day-picker"
import 'react-day-picker/style.css'
import { RegisterClientProps } from "./types"

export default function RegisterClient({ initialDates } : RegisterClientProps) {    
    const [dates, setDates] = useState<Date[]>(initialDates.map(calendar => calendar.date));
    const [selectedYear, setSelectedYear] = useState<number>(2026);    
    const months = Array.from({length: 12}, (_, i) => i);
    const [isPending, startTransition] = useTransition();

    const optionYears = useMemo(() => {
        const newDate = new Date()
        const actualYear = newDate.getFullYear();
        let yearBeingReeded = actualYear - 5;
        setSelectedYear(actualYear)                
        const years : Array<number> = [];
        while (yearBeingReeded < actualYear + 5) {
            years.push(yearBeingReeded);
            yearBeingReeded++
        }
        return years;
    }, [])

    const handleButtonClick = async () => {
        await saveDates(dates);
    }
    
    return (
        <LayoutComponent>
            {isPending && <Portal />}
            <Card className="w-4/5 h-full relative">
                <Button className="absolute top-4 right-4" onClick={() => startTransition(() =>  handleButtonClick())}>Confirmar</Button>
                <div className="flex justify-center pt-4">
                    <select value={selectedYear} className="border-1 rounded w-30" onChange={(e) => setSelectedYear(Number(e.target.value))}>
                        {optionYears.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}                        
                    </select>
                </div>
                <div className="grid-cols-3 grid">
                    {months.map(month => (
                        <div key={month} className="p-2 m-2 flex justify-center align-middle items-center">
                            <DayPicker
                                month={new Date(selectedYear, month)}
                                mode="multiple"
                                selected={dates}
                                onSelect={setDates}
                                animate
                                required
                            />
                        </div>
                    ))}                     
                </div>
            </Card>
        </LayoutComponent>
    )
}