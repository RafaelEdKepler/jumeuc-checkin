"use client";

import { useCallback, useOptimistic } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LogoComponent from "@/components/logo/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ListComponent from "@/components/list/list";
import { checkIn } from "./actions";
import { CheckinClientProps } from "./types";
import Portal from "@/components/portal/portal";

export default function CheckinClient({ initialAttendees, loading }: CheckinClientProps) {    
    
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
            {loading && <Portal />}
            <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6"> 
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl"> 
                    <CardContent className="p-8 space-y-6">
                        <LogoComponent /> 
                        <form className="flex gap-2" action={handleCheckIn}> 
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