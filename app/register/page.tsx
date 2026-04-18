import { Suspense } from "react"
import PortalServer from "@/shared/components/portal/server"
import { toLocalMidnight } from "@/shared/utils/normalize-data";
import RegisterClient from "@/features/register/components/register-page";
import { getDates } from "@/server/services/calendar.service";


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