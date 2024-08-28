import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';

export default function FlightsTable() {
  return (
    <div className="overflow-x-auto">
      <Card>
        <CardContent>
          <Table className="min-w-full">
            <TableCaption>A list of your recent flights.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black font-bold">N</TableHead>
                <TableHead className="text-black font-bold flex-nowrap">
                  PNR/eTicket
                </TableHead>
                <TableHead className="text-black font-bold">
                  Passengers
                </TableHead>
                <TableHead className="text-black font-bold hidden md:table-cell">
                  Companies
                </TableHead>
                <TableHead className="text-black font-bold hidden md:table-cell">
                  Itinerary
                </TableHead>
                <TableHead className="text-black font-bold hidden sm:table-cell">
                  Depart
                </TableHead>
                <TableHead className="text-black font-bold hidden sm:table-cell">
                  Return
                </TableHead>
                <TableHead className="text-black font-bold hidden md:table-cell">
                  Payed
                </TableHead>
                <TableHead className="text-black font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-xs">44</TableCell>
                <TableCell className="font-medium text-wrap text-xs">
                  LW4511 123-23123123313
                </TableCell>
                <TableCell className="font-medium text-wrap text-xs">
                  Taki Eddine Benhammadi
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  Ryanair
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  ALG-CZL
                </TableCell>
                <TableCell className="font-medium text-xs hidden sm:table-cell">
                  01/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs hidden sm:table-cell">
                  16/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  8 5900 DZD
                </TableCell>
                <TableCell className="flex items-center  font-medium text-xs">
                  <Badge variant="confirmed">Confirmed</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs">44</TableCell>
                <TableCell className="font-medium text-wrap text-xs">
                  LW4511 123-23123123313
                </TableCell>
                <TableCell className="font-medium text-wrap text-xs">
                  Taki Eddine Benhammadi
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  Ryanair
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  ALG-CZL
                </TableCell>
                <TableCell className="font-medium text-xs hidden sm:table-cell">
                  01/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs hidden sm:table-cell">
                  16/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  8 5900 DZD
                </TableCell>
                <TableCell className="flex items-center font-medium text-xs">
                  <Badge variant="reserved">Reserved</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs">44</TableCell>
                <TableCell className="font-medium text-wrap text-xs">
                  LW4511 123-23123123313
                </TableCell>
                <TableCell className="font-medium text-wrap text-xs">
                  Taki Eddine Benhammadi
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  Ryanair
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  ALG-CZL
                </TableCell>
                <TableCell className="font-medium text-xs hidden sm:table-cell">
                  01/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs hidden sm:table-cell">
                  16/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs hidden md:table-cell">
                  8 5900 DZD
                </TableCell>
                <TableCell className="flex items-center font-medium text-xs">
                  <Badge variant="canceled">Canceled</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
