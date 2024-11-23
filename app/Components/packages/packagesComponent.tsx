import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@/lib/store/store';
import { setPage } from '@/lib/store/custom/commonSlices/paginationSlice';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination';

import TripComponent from '@/app/commonComponents/tripComponent';

export default function PackagesComponent({data}:any) {
  // Sample data
  // const fakeList = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7,
  //   8, 9, 10, 11,
  // ];
  console.log("PackagesComponent",PackagesComponent)

  const totalItems = data?.length;

  // Constants for pagination
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [visiblePages, setVisiblePages] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(9); // Desktop
        setVisiblePages(5); // Desktop
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(4); // Tablet
        setVisiblePages(3); // Tablet
      } else {
        setItemsPerPage(2); // Mobile
        setVisiblePages(1); // Mobile
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redux hooks for pagination state
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  // Update these calculations
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    event?.preventDefault();
  };

  const getPageRange = () => {
    const halfVisible = Math.floor(visiblePages / 2);
    let start = Math.max(currentPage - halfVisible, 1);
    let end = Math.min(start + visiblePages - 1, totalPages);

    if (end - start + 1 < visiblePages) {
      start = Math.max(end - visiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  console.log("currentItems",currentItems)

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {currentItems?.map((item :any, index :number) => (
          <li key={index} className="col-span-1 divide-y">
            <div>
              <TripComponent 
              destinations ={item.destinations}
              url_featured_image ={item.url_featured_image}
              name={item.name}
              category={item.category}
              departures_count={item.departures_count}
              departures ={item.departures}/>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                className="hover:text-orange-500 transition-colors duration-200"
                href="#"
                onClick={() => handlePageChange(1)}
              />
            </PaginationItem>{' '}
            <PaginationItem>
              <PaginationPrevious
                className="hover:text-orange-500 transition-colors duration-200"
                href="#"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {getPageRange().map((page) => (
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
            <PaginationItem>
              <PaginationLast
                className="hover:text-orange-500 transition-colors duration-200"
                onClick={() => handlePageChange(totalPages)}
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
