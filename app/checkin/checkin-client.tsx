"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LogoComponent from "@/components/logo/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListComponent from "@/components/list/list";
import { checkIn } from "../../features/checkin/actions";
import { CheckinClientProps } from "./types";
import Portal from "@/components/portal/portal";
import LayoutComponent from "@/components/layout/layout";
import { toast } from "sonner";
import ListSkelletonComponent from "@/components/list-skelleton/list-skelleton";
import { AttendeeWithCount, getHowManyAttendance } from "@/lib/db";

export default function CheckinClient({ initialAttendees, loading, verse, isThereProgramToday }: CheckinClientProps) {    
    
    const [storedNames, setStoredNames] = useState<string[]>([]);
    const [attendees, setAttendees] = useState<AttendeeWithCount[]>(initialAttendees)
    const [isPending, startTransition] = useTransition();
    const [optimisticAttendees, addOptimisticAttendees] =
    useOptimistic(attendees, (state, attendee: AttendeeWithCount) => {
        const exists = state.some(a => a.name === attendee.name);

        if (exists) {
            return state.map(a =>
                a.name === attendee.name ? attendee : a
            );
        }

        return [...state, attendee];
    });

    const handleCheckIn = async (formData: FormData) => {
        const name = formData.get("name") as string;
        if (!name) return;

        addOptimisticAttendees({name, count: 1});
        
        setStoredNames(prev => {
            if (prev.includes(name)) return prev;
            const updated = [...prev, name];
            localStorage.setItem("@checkin/names", JSON.stringify(updated));
            return updated;
        });

        try {
            await checkIn(formData);
            const howManyAttendance = await getHowManyAttendance(name);
            setAttendees(prev => {
                 if (prev.some(att => att.name === name)) {                   
                    return prev.map(att =>
                        att.name === name
                            ? { ...att, count: howManyAttendance }
                            : att
                        );
                    }
                    
                    return [...prev, { name, count: howManyAttendance }];
                });
            if (howManyAttendance === 1) {
                toast("Seja bem vindo ao grupo! Essa é a sua primeira vez conosco!")
                return;
            }
            toast(`Essa é o seu ${howManyAttendance}º encontro seguido, continue assim!`)
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