"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import LogoComponent from "@/shared/components/logo/logo";
import ListComponent from "@/shared/components/list/list";
import Portal from "@/shared/components/portal/portal";
import LayoutComponent from "@/shared/components/layout/layout";
import ListSkelletonComponent from "@/shared/components/list-skelleton/list-skelleton";
import { CheckinClientProps } from "../types";
import useCheckin from "../hooks/use-checkin";
import TabsCheckinComponent from "./tabs-checkin";

export default function CheckinClient({
  initialAttendees,
  loading,
  verse,
  isThereProgramToday,
}: CheckinClientProps) {
  const {
    handleCheckIn,
    isPending,
    optimisticAttendees,
    storedNames,
    selectedTab,
    setSelectedTab,
  } = useCheckin({ initialAttendees });

  return (
    <>
      {isPending && <Portal />}
      <LayoutComponent>
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <LogoComponent
              verse={verse}
              isThereProgramToday={isThereProgramToday}
              isCheckin={true}
            />
            {isThereProgramToday ? (
              <>
                <form action={(formData) => handleCheckIn(formData)}>
                  <TabsCheckinComponent
                    loading={loading}
                    storedNames={storedNames}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
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
