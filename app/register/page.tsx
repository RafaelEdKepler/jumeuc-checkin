import { Suspense } from "react"
import RegisterClient from "./register-client"
import { getDates } from "@/lib/db"
import PortalServer from "@/components/portal/server"

export const metadata = {
    title: "Jumeuc - Liderança",
    description: "Confirme as datas das programações",
};

async function CalendarData() {
  const dates = await getDates(2026)
  return <RegisterClient initialDates={dates} />
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<PortalServer />}>
      <CalendarData />
    </Suspense>
  )
}