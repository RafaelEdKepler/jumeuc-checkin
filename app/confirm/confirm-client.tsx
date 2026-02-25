"use client"

import ListConfirmComponent from "@/components/list-confirm/list-confirm";
import LogoComponent from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ConfirmClientProps from "./types";
import { useState } from "react";
import { confirmAttendeeAction } from "../checkin/actions";
import { useFormStatus } from "react-dom";


export default function ConfirmClient({ attendees } : ConfirmClientProps) {

    const [attendeesList, setAttendeesList] = useState(attendees);    
    const { pending } = useFormStatus();

    

    const handleConfirmAttendance = async () => {        
        const confirmedAttendees = attendeesList.filter(attendee => attendee.confirmed).map(attendee => attendee.id);
        const notConfirmedAttendees = attendeesList.filter(attendee => !attendee.confirmed).map(attendee => attendee.id);        

        try {
            await confirmAttendeeAction(confirmedAttendees, notConfirmedAttendees);
        } catch (err) {
            console.log('Error in fetching the confirmed')
        }
    }

    const handleUpdateAttendance = (attendeeId: number) => {
        setAttendeesList(prevList => 
            prevList.map(attendee => 
                attendee.id === attendeeId ? { ...attendee, confirmed: !attendee.confirmed } : attendee
            )
        );
    }

    const handleGetAttendeesForDate = async (formData: FormData) => {
        const date = formData.get("date") as string;
        if (!date) return;
        try {
            const response = await fetch(`/api/checkin?date=${date}`);
            if (response.ok) {
                response.json().then(data => {
                    setAttendeesList(data);
                })
            }        
        } catch (err) {
            console.error("Error fetching attendees for date:", err);
        }
    }

    return (
            <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6"> 
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl"> 
                    <CardContent className="p-8 space-y-6">
                        <LogoComponent verse=""/> 
                        <form className="flex gap-2" action={handleGetAttendeesForDate} >                        
                            <Input type="date" name="date" defaultValue={new Date().toLocaleDateString("sv-SE")}/>
                            <Button type="submit">Pesquisar</Button>
                        </form>
                        <ListConfirmComponent attendees={attendeesList} onAttendeePress={handleUpdateAttendance}/> 
                        <form className="w-full align-middle justify-center" action={handleConfirmAttendance}>
                            <Button onClick={handleConfirmAttendance} type="submit">Confirmar</Button>
                        </form>
                    </CardContent> 
                </Card> 
            </div>         
    )
}