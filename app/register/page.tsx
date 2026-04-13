import { Suspense } from "react"
import RegisterClient from "./register-client"
import { getDates } from "@/lib/db"
import PortalServer from "@/components/portal/server"
import { toLocalMidnight } from "@/utils/normalize-data";

export const metadata = {
    title: "Jumeuc - Liderança",
    description: "Confirme as datas das programações",
};

export const dynamic = "force-dynamic"

async function CalendarData() {
  const dates = await getDates(new Date().getFullYear())  
  return <RegisterClient initialDates={dates.map(date => toLocalMidnight(date.date))} />
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<PortalServer />}>
      <CalendarData />
    </Suspense>
  )
}