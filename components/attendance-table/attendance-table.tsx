import { AttendanceClientProps } from "@/app/attendance/types";
import { Table, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function AttendanceTableComponent({ topAttendants } : AttendanceClientProps) {    
    return (
        <Table>
            <TableCaption>Os mais assíduos da JUMEUC! 🔥</TableCaption>
            <TableHeader>                
                <TableRow>                    
                    <TableHead>
                        Posição
                    </TableHead>
                    <TableHead>
                        Nome
                    </TableHead>
                    <TableHead>
                        Quantia de vezes
                    </TableHead>
                    <TableHead>
                        Percentual
                    </TableHead>
                </TableRow>
                {topAttendants && topAttendants.map((attendant) => (
                    <TableRow key={attendant.position}>
                        <TableCell>
                            {attendant.position}º
                        </TableCell>
                        <TableCell>
                            {attendant.name}
                        </TableCell>
                        <TableCell>
                            {attendant.count}
                        </TableCell>
                        <TableCell>
                            {attendant.percentual}%
                        </TableCell>
                    </TableRow>
                ))}
            </TableHeader>
        </Table>
    )
}