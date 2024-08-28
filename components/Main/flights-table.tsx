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
    // Table is full with static data
    // It can be changed to dynamic data using map function
    //  It's easy to be changed, will work on it later
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent flights.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black font-bold">N</TableHead>
                <TableHead className="text-black font-bold flex-nowrap">
                  PNR/eTicket
                </TableHead>
                <TableHead className="text-black font-bold">
                  Passangers
                </TableHead>
                <TableHead className="text-black font-bold">
                  Companies
                </TableHead>
                <TableHead className="text-black font-bold">
                  Itinerary
                </TableHead>
                <TableHead className="text-black font-bold">Depart</TableHead>
                <TableHead className="text-black font-bold">Return</TableHead>
                <TableHead className="text-black font-bold">Payed</TableHead>
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
                <TableCell className="font-medium text-xs">Ryanair</TableCell>
                <TableCell className="font-medium text-xs">ALG-CZL</TableCell>
                <TableCell className="font-medium text-xs">
                  01/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs">
                  16/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs">
                  8 5900 DZD
                </TableCell>
                <TableCell className="font-medium text-xs">
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
                <TableCell className="font-medium text-xs">Ryanair</TableCell>
                <TableCell className="font-medium text-xs">ALG-CZL</TableCell>
                <TableCell className="font-medium text-xs">
                  01/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs">
                  16/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs">
                  8 5900 DZD
                </TableCell>
                <TableCell className="font-medium text-xs">
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
                <TableCell className="font-medium text-xs">Ryanair</TableCell>
                <TableCell className="font-medium text-xs">ALG-CZL</TableCell>
                <TableCell className="font-medium text-xs">
                  01/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs">
                  16/02/2024
                </TableCell>
                <TableCell className="font-medium text-xs">
                  8 5900 DZD
                </TableCell>
                <TableCell className="font-medium text-xs">
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
