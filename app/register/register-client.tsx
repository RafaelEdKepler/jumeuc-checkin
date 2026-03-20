"use client"

import LayoutComponent from "@/components/layout/layout"
import Portal from "@/components/portal/portal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { deleteSingleData, getDates, saveSingleDate } from "@/lib/db"
import { useMemo, useRef, useState, useTransition } from "react"
import { DayPicker } from "react-day-picker"
import 'react-day-picker/style.css'
import { CalendarProp, RegisterClientProps } from "./types"
import { redirect } from "next/navigation"

export default function RegisterClient({ initialDates } : RegisterClientProps) {    
    const [dates, setDates] = useState<Date[]>(initialDates.map(calendar => calendar.date));
    const selectedYearRef = useRef<number>(new Date().getFullYear())
    const months = Array.from({length: 12}, (_, i) => i);
    const [isPending, startTransition] = useTransition();

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
        const filterDate = dates.find(stateDate => stateDate.getTime() === updatedDate.getTime());        
        if (filterDate) {
            setDates(prev => prev.filter(date => date !== filterDate))
            await deleteSingleData(filterDate);
            return
        } else {
            setDates(prev => [...prev, updatedDate])
            await saveSingleDate(updatedDate);
        }
    }

    const handleChangeYear = async (year: string) => {        
        const datesOfTheSelectedYear : CalendarProp[] = await getDates(Number(year))
        selectedYearRef.current = Number(year);
        setDates(datesOfTheSelectedYear.map(date => date.date));
    }    
    
    return (
        <LayoutComponent>
            {isPending && <Portal />}
            <Card className="w-4/5 h-full relative">
                <Button className="absolute top-4 right-4" onClick={() => startTransition(() =>  handleButtonClick())}>Confirmar</Button>
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
                                selected={dates}
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