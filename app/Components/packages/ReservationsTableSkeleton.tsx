import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 10 
}) => {
  const skeletonRows = Array(rows).fill(0);
  const skeletonColumns = Array(columns).fill(0);

  return (
    <div className="overflow-x-auto">
      <Card>
        <CardContent>
          <Table className="min-w-full animate-pulse">
            <TableHeader>
              <TableRow className='bg-red-400'>
                {skeletonColumns.map((_, colIndex) => (
                  <TableCell 
                    key={colIndex} 
                    className="text-black font-bold bg-gray-200"
                  >
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {skeletonRows.map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {skeletonColumns.map((_, colIndex) => (
                    <TableCell 
                      key={colIndex} 
                      className="font-medium text-xs"
                    >
                      <div className={`
                        h-4 
                        ${colIndex === 0 ? 'w-8' : 'w-16'} 
                        bg-gray-200 rounded
                      `}></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableSkeleton;