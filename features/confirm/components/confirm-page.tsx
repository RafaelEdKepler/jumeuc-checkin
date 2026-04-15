"use client"

import ListConfirmComponent from "@/shared/components/list-confirm/list-confirm";
import LogoComponent from "@/shared/components/logo/logo";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import ConfirmClientProps from "../types";
import LayoutComponent from "@/shared/components/layout/layout";
import ListSkelletonComponent from "@/shared/components/list-skelleton/list-skelleton";
import useConfirm from "../hooks/use-confirm";


export default function ConfirmClient({ attendees, loading } : ConfirmClientProps) {

    const { attendeesList, handleConfirmAttendance, handleGetAttendeesForDate, handleUpdateAttendance } = useConfirm(attendees);
    
    return (
            <LayoutComponent>
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl"> 
                    <CardContent className="p-8 space-y-6">
                        <LogoComponent verse=""/> 
                        <form className="flex gap-2" action={handleGetAttendeesForDate} >                        
                            <Input type="date" name="date" defaultValue={new Date().toLocaleDateString("sv-SE")} disabled={loading}/>
                            <Button type="submit">Pesquisar</Button>
                        </form>
                        {loading ? (
                            <ListSkelletonComponent />
                        ) : (
                            <ListConfirmComponent attendees={attendeesList} onAttendeePress={handleUpdateAttendance}/> 
                        )}
                        <form className="w-full align-middle justify-center" action={handleConfirmAttendance}>
                            <Button type="submit">Confirmar</Button>
                        </form>
                    </CardContent> 
                </Card> 
            </LayoutComponent>
    )
}