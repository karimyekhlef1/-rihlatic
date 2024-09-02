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
  const fakeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {fakeList.map((item, index) => (
          <li key={index} className="col-span-1 divide-y">
            <div>
              <TripComponent text="Voyage" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
