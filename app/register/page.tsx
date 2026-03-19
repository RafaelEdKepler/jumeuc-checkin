import { Suspense } from "react"
import RegisterClient from "./register-client"
import { getDates } from "@/lib/db"
import PortalServer from "@/components/portal/server"

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