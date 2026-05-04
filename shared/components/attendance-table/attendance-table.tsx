import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AttendanceTableProp } from "./types";

export default function AttendanceTableComponent({
  topAttendants,
}: AttendanceTableProp) {
  return (
    <>
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-8 lg:w-auto">🏆</TableHead>
            <TableHead className="w-25 lg:w-auto">Nome</TableHead>
            <TableHead>Presenças</TableHead>
            <TableHead>Percentual</TableHead>
          </TableRow>
          {topAttendants &&
            topAttendants.map((attendant) => (
              <TableRow key={attendant.position}>
                <TableCell>{attendant.position}º</TableCell>
                <TableCell className="w-10 lg:w-auto overflow-hidden text-ellipsis whitespace-nowrap">
                  {attendant.name}
                </TableCell>
                <TableCell>{attendant.count}</TableCell>
                <TableCell>{attendant.percentual}%</TableCell>
              </TableRow>
            ))}
        </TableHeader>
      </Table>
    </>
  );
}
