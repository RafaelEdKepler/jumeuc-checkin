"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import LogoComponent from "@/shared/components/logo/logo";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import ListComponent from "@/shared/components/list/list";
import Portal from "@/shared/components/portal/portal";
import LayoutComponent from "@/shared/components/layout/layout";
import ListSkelletonComponent from "@/shared/components/list-skelleton/list-skelleton";
import { CheckinClientProps } from "../types";
import useCheckin from "../hooks/useCheckin";

export default function CheckinClient({ initialAttendees, loading, verse, isThereProgramToday }: CheckinClientProps) {    
    
    const { handleCheckIn, isPending, optimisticAttendees, storedNames } = useCheckin({ initialAttendees });

    return (
        <>
            {(isPending ) && <Portal />}
            <LayoutComponent>
                <Card className="w-full max-w-2xl shadow-xl rounded-2xl"> 
                    <CardContent className="p-8 space-y-6">
                        <LogoComponent verse={verse} isThereProgramToday={isThereProgramToday} isCheckin={true}/> 
                        {isThereProgramToday ? (
                            <>
                                <form className="flex gap-2" action={(formData) => handleCheckIn(formData)} > 
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