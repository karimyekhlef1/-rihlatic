import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { setPage } from '@/lib/store/commonSlices/paginationSlice';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import TripComponent from '@/app/commonComponents/tripComponent';

export default function PackagesComponent() {
  // Sample data
  const fakeList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7,
    8, 9, 10,
  ];

  // Constants for pagination
  const itemsPerPage = 3;
  const totalItems = fakeList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Redux hooks for pagination state
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fakeList.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {currentItems.map((item, index) => (
          <li key={index} className="col-span-1 divide-y">
            <div>
              <TripComponent text={`Voyage ${item}`} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="hover:text-orange-500 transition-colors duration-200"
                href="#"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className={
                    currentPage === page
                      ? 'bg-orange-500 hover:bg-orange-600 hover:text-white text-white'
                      : 'hover:text-orange-500'
                  }
                  href="#"
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className="hover:text-orange-500 transition-colors duration-200"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
