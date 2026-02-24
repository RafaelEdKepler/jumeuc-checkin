"use client";

import { useOptimistic, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LogoComponent from "@/components/logo/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListComponent from "@/components/list/list";
import { checkIn } from "./actions";
import { CheckinClientProps } from "./types";
import Portal from "@/components/portal/portal";

export default function CheckinClient({ initialAttendees, loading, verse }: CheckinClientProps) {    
    
    const [isPending, startTransition] = useTransition();

    const handleCheckIn = async (formData : FormData) => {
        const name = formData.get("name") as string;
        if (!name) return;
        addOptimisticAttendees(name);
        try {
            await checkIn(formData);
        } catch (err) {
            console.error("Error during check-in:", err);
        }
    }

    const [optimisticAttendees, addOptimisticAttendees] =
        useOptimistic(initialAttendees, (state, newName: string) => [
            ...state,
            newName,
        ]);

    return (
        <>
            {isPending && <Portal />}
            <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6"> 
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl"> 
                    <CardContent className="p-8 space-y-6">
                        <LogoComponent verse={verse}/> 
                        <form className="flex gap-2" action={(formData) => startTransition(() => handleCheckIn(formData))} > 
                            <Input placeholder="Digite seu nome" name="name" /> 
                            <Button type="submit">Confirmar</Button> 
                        </form> 
                        <ListComponent attendees={optimisticAttendees} /> 
                    </CardContent> 
                </Card> 
            </div>
        </>
    );
}