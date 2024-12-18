import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pricingData = [
  {
    category: "Adulte",
    simple: "260 000 DZD",
    double: "270 000 DZD",
    triple: "280 000 DZD",
    quadruple: "290 000 DZD",
    quintuple: "300 000 DZD",
    hexagonale: "310 000 DZD",
    heptagonale: "320 000 DZD",
  },
  {
    category: "Enfant",
    simple: "210 000 DZD",
    double: "210 000 DZD",
    triple: "210 000 DZD",
    quadruple: "210 000 DZD",
    quintuple: "210 000 DZD",
    hexagonale: "210 000 DZD",
    heptagonale: "210 000 DZD",
  },
  {
    category: "Enfant sans lit",
    simple: "200 000 DZD",
    double: "200 000 DZD",
    triple: "200 000 DZD",
    quadruple: "200 000 DZD",
    quintuple: "200 000 DZD",
    hexagonale: "200 000 DZD",
    heptagonale: "200 000 DZD",
  },
  {
    category: "Bébé",
    simple: "180 000 DZD",
    double: "180 000 DZD",
    triple: "180 000 DZD",
    quadruple: "180 000 DZD",
    quintuple: "180 000 DZD",
    hexagonale: "180 000 DZD",
    heptagonale: "180 000 DZD",
  },
];

export default function PricingTable() {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium"></TableHead>
            <TableHead className="font-medium text-orange-500 hover:text-orange-700">
              Simple
            </TableHead>
            <TableHead className="font-medium text-orange-500 hover:text-orange-700">
              Double
            </TableHead>
            <TableHead className="font-medium text-orange-500 hover:text-orange-700">
              Triple
            </TableHead>
            <TableHead className="font-medium text-orange-500 hover:text-orange-700">
              Quadruple
            </TableHead>
            <TableHead className="font-medium text-orange-500 hover:text-orange-700">
              Quintuple
            </TableHead>
            <TableHead className="font-medium text-orange-500 hover:text-orange-700">
              Hexagonale
            </TableHead>
            <TableHead className="font-medium text-orange-500 hover:text-orange-700">
              Heptagonale
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pricingData.map((row, index) => (
            <TableRow
              key={row.category}
              className={index % 2 === 0 ? "bg-muted/50" : ""}
            >
              <TableCell className="font-medium text-orange-500 hover:text-orange-700">
                {row.category}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {row.simple}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {row.double}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {row.triple}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {row.quadruple}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {row.quintuple}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {row.hexagonale}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {row.heptagonale}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
