"use client";

import AttendanceTableComponent from "@/shared/components/attendance-table/attendance-table";
import LayoutComponent from "@/shared/components/layout/layout";
import LogoComponent from "@/shared/components/logo/logo";
import { Card } from "@/shared/components/ui/card";
import { AttendanceClientProps } from "../types";
import ListSkelletonComponent from "@/shared/components/list-skelleton/list-skelleton";
import { Button } from "@/shared/components/ui/button";
import useAttendance from "../hook/use-attendance";
import Portal from "@/shared/components/portal/portal";

export default function AttendanceClientPage({
  topAttendants,
  loading,
}: AttendanceClientProps) {
  const { attendances, handleShowMoreClick, isPending, hasMore } =
    useAttendance(topAttendants);

  return (
    <LayoutComponent>
      {isPending && <Portal />}
      <Card className="min-h-100 lg:p-10 sm:p-20">
        <LogoComponent />
        <h2 className="text-1xl font-bold text-center">
          Os mais assíduos da JUMEUC!
        </h2>
        {loading ? (
          <ListSkelletonComponent />
        ) : (
          <AttendanceTableComponent topAttendants={attendances} />
        )}
        {hasMore && (
          <div className="flex w-full justify-center items-center">
            <div>
              <Button onClick={handleShowMoreClick}>Mostrar mais</Button>
            </div>
          </div>
        )}
      </Card>
    </LayoutComponent>
  );
}
