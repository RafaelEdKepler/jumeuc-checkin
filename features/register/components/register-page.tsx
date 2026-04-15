"use client"

import 'react-day-picker/style.css'
import LayoutComponent from "@/shared/components/layout/layout"
import Portal from "@/shared/components/portal/portal"
import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { DayPicker } from "react-day-picker"
import { RegisterClientProps } from "../types"
import useRegister from '../hooks/use-register'

export default function RegisterClient({ initialDates }: RegisterClientProps) {

    const { handleButtonClick, handleSelectOrUnselectData, isPending, months, selectedYearRef, optimisticDates } = useRegister(initialDates)

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