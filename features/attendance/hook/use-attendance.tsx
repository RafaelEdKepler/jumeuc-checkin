import { getMoreAttendance } from "@/server/services/wall.service";
import { TopAttendanceReturnProp } from "@/shared/types/types";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export default function useAttendance(
  preLoadedAttendances: Array<TopAttendanceReturnProp>,
) {
  const [attendances, setAttendances] =
    useState<Array<TopAttendanceReturnProp>>(preLoadedAttendances);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const pageRef = useRef(0);

  const handleShowMoreClick = useCallback(() => {
    pageRef.current++;
    startTransition(async () => {
      try {
        const newAttendees = await getMoreAttendance(pageRef.current);
        setAttendances((prev) => [...prev, ...newAttendees.data]);
        setHasMore(newAttendees.hasMore);
      } catch {
        toast.error("Falha ao buscar novos dados.");
      }
    });
  }, []);

  return {
    attendances,
    handleShowMoreClick,
    isPending,
    hasMore,
  };
}
