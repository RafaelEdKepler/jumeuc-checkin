import { getAttendees } from "@/lib/db";
import CheckinClient from "./checkin-client";
import { use } from "react";

export default async function Page() {
    const res = await fetch('https://biblia-api.fly.dev/cadastro', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify(
            { 
                nome: "Rafael", 
                email: "rafael.kepler@hotmail.com", 
                uso: "Consulta de versículos diários", 
                perfil: "Programação" 
            }
        ) 
    }).then(res => res.json()).then(console.log).catch(console.error);

    console.log(res)

    let attendees: string[] = [];

    try {
        attendees = await getAttendees();
    } catch (error) {
        console.error("Error fetching attendees:", error);
    }

    return <CheckinClient initialAttendees={attendees} />;
}