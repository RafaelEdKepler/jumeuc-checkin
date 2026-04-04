"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LogoComponent from "@/components/logo/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListComponent from "@/components/list/list";
import { checkIn } from "./actions";
import { CheckinClientProps } from "./types";
import Portal from "@/components/portal/portal";
import LayoutComponent from "@/components/layout/layout";
import { toast } from "sonner";
import ListSkelletonComponent from "@/components/list-skelleton/list-skelleton";

export default function CheckinClient({ initialAttendees, loading, verse, isThereProgramToday }: CheckinClientProps) {    
    
    const [storedNames, setStoredNames] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const [optimisticAttendees, addOptimisticAttendees] =
        useOptimistic(initialAttendees, (state, newName: string) => [
            ...state,
            newName,
        ]);

    const handleCheckIn = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if (!name) return;

    addOptimisticAttendees(name);
    
    setStoredNames(prev => {
        if (prev.includes(name)) return prev;
        const updated = [...prev, name];
        localStorage.setItem("@checkin/names", JSON.stringify(updated));
        return updated;
    });

    try {
        await checkIn(formData);
    } catch {
        toast.error("Ocorreu um problema! Tente novamente");
    }
    };


    useEffect(() => {
        const saved = localStorage.getItem("@checkin/names");
        if (saved) {
            setStoredNames(JSON.parse(saved));
        }
    }, []);


    return (
        <>
            {(isPending ) && <Portal />}
            <LayoutComponent>
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl"> 
                    <CardContent className="p-8 space-y-6">
                        <LogoComponent verse={verse} isThereProgramToday={isThereProgramToday} isCheckin={true}/> 
                        {isThereProgramToday ? (
                            <>
                                <form className="flex gap-2" action={(formData) => startTransition(() => handleCheckIn(formData))} > 
                                    <Input placeholder="Digite seu nome" name="name" disabled={loading}/> 
                                    <datalist id="names">
                                        {storedNames.map(name => (
                                            <option key={name} value={name} />
                                        ))}
                                    </datalist>
                                    <Button type="submit">Confirmar</Button> 
                                </form>
                                {loading ? (
                                    <ListSkelletonComponent />
                                ) : (
                                    <ListComponent attendees={optimisticAttendees} /> 
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </CardContent> 
                </Card> 
            </LayoutComponent>
        </>
    );
}