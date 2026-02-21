import { getAttendees } from "@/lib/db";
import CheckinClient from "./checkin-client";

export default async function Page() {    
    let loading = true;
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

    alert(JSON.stringify(res))

    let attendees: string[] = [];

    try {        
        attendees = await getAttendees();
    } catch (error) {
        console.error("Error fetching attendees:", error);
    } finally {
        loading = false;
    }

    return <CheckinClient initialAttendees={attendees} loading={loading} />;
}